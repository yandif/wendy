import {
  Button,
  Container,
  createStyles,
  Grid,
  Input,
  MultiSelect,
  TextInput,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import type { Tag } from '@prisma/client';
import type { ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { forwardRef, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { db } from '~/server/database/db.server';
import { checkAuth } from '~/server/middleware/auth.server';
import {
  commitSession,
  getSession,
  setErrorMessage,
  setSuccessMessage,
} from '~/server/middleware/message.server';
import EngineDemo from '~/web/components/Editor';
import { dropzoneChildren } from '~/web/components/Upload/ImgUpload';
import { useTitle } from '~/web/hooks/useTitle';

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === 'dark';

  return {
    main: {
      padding: '30px',
      maxWidth: '100%',
      backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
    },
  };
});

export default function CreateArticle() {
  const { article } = useLoaderData() || {};
  useTitle(article ? '文章详情' : '新建文章');

  const initialValues = (() => {
    if (article) {
      return {
        title: article.title,
        content: article.content,
        tag: (article as any)?.tag.map((v: Tag) => `${v.id}`),
        cover: article.cover,
      };
    }
    return {
      title: '',
      content: '',
      tag: [] as string[],
      cover: '',
    };
  })();

  const { classes, theme } = useStyles();

  const fetcher = useFetcher();
  const form = useForm({
    initialValues,

    validate: {
      title: (value) => (value?.length === 0 ? '请输入文章标题' : null),
      content: (value) =>
        value?.length === 0 || value === '<p></p>' ? '请输入文章内容' : null,
      // cover: (value) => {
      //   return !value?.id ? '请上传封面' : null;
      // },
    },
  });

  /** 选择标签👇 */
  const tagFetcher = useFetcher();
  const createTagFetcher = useFetcher();
  const [tags, setTags] = useState<any>([]);

  const queryTags = async () => {
    await tagFetcher.load('/admin/tag?size=1000&page=1');
  };

  useEffect(() => {
    queryTags();
  }, []);

  useEffect(() => {
    if (tagFetcher?.data) {
      const data = tagFetcher?.data?.data?.map((v: Tag) => {
        const { name, id, description } = v;
        return { label: name, value: `${id}`, description };
      });
      setTags(data);
    }
  }, [tagFetcher?.data]);

  useEffect(() => {
    if (createTagFetcher?.data?.data) {
      const { name, id, description } = createTagFetcher.data.data;

      setTags([{ label: name, value: `${id}`, description }, ...tags]);

      form.setFieldValue(
        'tag',
        form.values.tag.map((v: string) => {
          if (v === name) {
            return `${id}`;
          } else {
            return v;
          }
        }),
      );
    }
  }, [createTagFetcher.data]);

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
  }

  const TagItem = forwardRef<HTMLDivElement, ItemProps>(
    // eslint-disable-next-line react/prop-types
    ({ label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        {label}
      </div>
    ),
  );
  /** 选择标签👆 */

  const handleEdit = async () => {
    const res = form.validate();
    if (
      form.values.title === article.title &&
      form.values.content === article.content &&
      form.values.tag.toString() ===
        (article as any)?.tag.map((v: Tag) => `${v.id}`).toString() &&
      form.values.cover?.id === article.cover?.id
    ) {
      return;
    }

    if (!res.hasErrors) {
      const { title, tag, content, cover } = form.values;
      await fetcher.submit(
        {
          id: `${article.id}`,
          title,
          content,
          cover: cover?.id,
          tag: tag.toString(),
        },
        {
          method: 'post',
        },
      );
    }
  };

  const handleCreate = async () => {
    const res = form.validate();
    if (!res.hasErrors) {
      const { title, tag, content, cover } = form.values;
      await fetcher.submit(
        {
          title,
          content,
          cover: cover?.id,
          tag: tag.toString(),
        },
        {
          method: 'post',
        },
      );
    }
  };

  // 上传图片
  const imgFetcher = useFetcher();
  const handleUploa = (file: any) => {
    imgFetcher.submit(
      { img: file },
      {
        encType: 'multipart/form-data',
        action: '/api/upload',
        method: 'post',
      },
    );
  };
  useEffect(() => {
    if (imgFetcher.data?.data) {
      form.setFieldValue('cover', imgFetcher.data.data);
    }
  }, [imgFetcher.data]);
  const coverSrc = form.values.cover?.name
    ? `/img/${form.values.cover?.name}`
    : undefined;

  return (
    <Grid>
      <Grid.Col xs={8}>
        <Container className={classes.main}>
          <fetcher.Form>
            <Input.Wrapper
              pb="md"
              required
              label="内容"
              {...form.getInputProps('content')}>
              <EngineDemo
                placeholder="文章内容"
                {...form.getInputProps('content')}
              />
            </Input.Wrapper>
          </fetcher.Form>
        </Container>
      </Grid.Col>
      <Grid.Col xs={4}>
        <Container className={classes.main}>
          <fetcher.Form>
            <TextInput
              pb="md"
              required
              label="标题"
              placeholder="文章标题"
              {...form.getInputProps('title')}
            />
            <MultiSelect
              pb="md"
              label="标签"
              data={tags}
              placeholder="文章标签"
              searchable
              creatable
              maxSelectedValues={4}
              getCreateLabel={(query) => `+ 新建 ${query}`}
              onCreate={async (query) => {
                await createTagFetcher.submit(
                  { name: query },
                  {
                    action: '/admin/tag',
                    method: 'post',
                  },
                );
              }}
              itemComponent={TagItem}
              filter={(value, selected, item) => {
                if (selected) return false;
                const filterName = item?.label
                  ?.toLowerCase()
                  ?.includes(value?.toLowerCase()?.trim());
                const filterDescription = item?.description
                  ?.toLowerCase()
                  ?.includes(value?.toLowerCase()?.trim());
                return filterName || filterDescription;
              }}
              {...form.getInputProps('tag')}
            />
          </fetcher.Form>
        </Container>
        <Container mt={16} className={classes.main}>
          <Input.Wrapper pb="md" label="封面" {...form.getInputProps('cover')}>
            <Dropzone
              sx={(theme) => {
                const error = form.getInputProps('cover').error;
                const isDark = theme.colorScheme === 'dark';
                if (error) {
                  return {
                    borderColor: theme.colors.red[isDark ? 4 : 6],
                  };
                }
                return {};
              }}
              p={2}
              loading={imgFetcher.state === 'loading'}
              multiple={false}
              onDrop={(files) => handleUploa(files[0])}
              maxSize={5_000_000}
              accept={IMAGE_MIME_TYPE}
              onReject={() => {
                toast.error('图片不能大于5M');
              }}>
              {(status) => dropzoneChildren(status, theme, coverSrc)}
            </Dropzone>
          </Input.Wrapper>
        </Container>
        <Container mt={16} className={classes.main}>
          <Button onClick={article ? handleEdit : handleCreate}>
            {article ? '保存' : '提交'}
          </Button>
        </Container>
      </Grid.Col>
    </Grid>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const session = await getSession(request.headers.get('cookie'));
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const tag = (formData.get('tag') as string)?.split(',')?.filter((v) => !!v);
  const content = formData.get('content') as string;
  const cover = Number(formData.get('cover') as string);

  if (title && content) {
    const article = await db.article.create({
      data: {
        title,
        content,
        cover: cover ? { connect: { id: cover } } : undefined,
        tag: { connect: tag.map((v) => ({ id: Number(v) })) },
        author: { connect: { id: user.id } },
      },
    });

    setSuccessMessage(session, '提交成功!');
    return redirect(`/admin/article/list/${article.id}`, {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  } else {
    setErrorMessage(session, '请确保文章有标题，内容有值!');
    return json(
      { ok: false },
      {
        headers: { 'Set-Cookie': await commitSession(session) },
      },
    );
  }
};
