import {
  Button,
  createStyles,
  Divider,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import type { Article } from '@prisma/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';

import { db } from '~/server/database/db.server';
import { checkAuth } from '~/server/middleware/auth.server';
import {
  commitSession,
  getSession,
  setErrorMessage,
  setSuccessMessage,
} from '~/server/middleware/message.server';
import ErrorMessage from '~/web/components/ErrorMessage';
import Table from '~/web/components/Table';
import { useTitle } from '~/web/hooks/useTitle';

type LoaderData = {
  ok: boolean;
  data: Article[];
  page: number;
  size: number;
  total: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const search = new URL(request.url).searchParams;
  const size = Number(search.get('size') || '10');
  const page = Number(search.get('page') || '1');

  if (isNaN(size)) throw new Error('page 不是数字！');
  if (isNaN(page)) throw new Error('page 不是数字！');
  if (!(size > 0)) throw new Error('size 应该大于零！');
  if (!(page > 0)) throw new Error('page 应该大于零！');

  const selectOption = {
    where: { author: { id: user.id } },
  };

  const total = await (await db.article.findMany(selectOption)).length;

  if (page > Math.ceil(total / size) && total !== 0)
    throw new Error('page 太大了！');

  const findArticle = await db.article.findMany({
    ...selectOption,
    skip: (page - 1) * size,
    take: size,
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
  });

  const data: LoaderData = {
    ok: true,
    data: findArticle,
    page: page,
    size: size,
    total,
  };

  return json(data);
};

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === 'dark';

  return {
    main: {
      padding: '16px',

      backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
    },
  };
});

export default function ArticleList() {
  useTitle('文章列表');
  const nav = useNavigate();
  const fetcher = useFetcher();
  const { classes } = useStyles();
  const data = useLoaderData<LoaderData>();

  const handleDelete = async (id: string) => {
    await fetcher.submit(
      { id },
      {
        method: 'delete',
      },
    );
  };

  const renderAction = useCallback((data: Article) => {
    return (
      <>
        <UnstyledButton
          onClick={() => nav(`${data.id}`)}
          sx={(theme) => {
            return {
              whiteSpace: 'nowrap',
              fontSize: 14,
              padding: 4,
              margin: 4,
              display: 'block',
              color: theme.colors.blue[6],
            };
          }}>
          查看详情
        </UnstyledButton>
        <UnstyledButton
          onClick={() => handleDelete(`${data.id}`)}
          sx={(theme) => {
            return {
              whiteSpace: 'nowrap',
              fontSize: 14,
              padding: 4,
              margin: 4,
              display: 'block',
              color: theme.colors.red[6],
            };
          }}>
          删除
        </UnstyledButton>
      </>
    );
  }, []);

  const columns = [
    {
      name: 'id',
      header: 'ID',
      width: '15%',
    },
    {
      name: 'title',
      header: '标题',
      width: '70%',
    },
    {
      name: 'action',
      header: '操作',
      width: '15%',
      render: renderAction,
    },
  ];

  return (
    <Paper className={classes.main}>
      <Stack align="flex-end">
        <Button m={0} size="sm" onClick={() => nav('/admin/article/create')}>
          新建文章
        </Button>
      </Stack>
      <Divider mt="md" mb="lg" />
      <Table data={data.data} columns={columns} pagination={data} />
    </Paper>
  );
}

export const action: ActionFunction = async ({ request }) => {
  // console.log(request.method);

  const user = await checkAuth(request);
  const session = await getSession(request.headers.get('cookie'));

  const formData = await request.formData();
  const id = Number(formData.get('id') as string);

  const article = await db.article.findUnique({ where: { id: id } });

  if (!article || article.accountId !== user.id) {
    setErrorMessage(session, '删除失败，文章不存在!');
    return json(
      { ok: false },
      {
        headers: { 'Set-Cookie': await commitSession(session) },
      },
    );
  } else {
    await db.article.delete({ where: { id: id } });
    setSuccessMessage(session, '删除成功');
    return json(
      { ok: true },
      {
        headers: { 'Set-Cookie': await commitSession(session) },
      },
    );
  }
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return <ErrorMessage label="Error" title={error.message} />;
};
