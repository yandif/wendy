import {
  Button,
  createStyles,
  Divider,
  Image,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { checkAuth } from '~/server/middleware/auth.server';
import type { CountImage } from '~/server/models/image.server';
import { GetImageList } from '~/server/models/image.server';
import Table from '~/web/components/Table';
import { useTitle } from '~/web/hooks/useTitle';

export { CatchBoundary, ErrorBoundary } from '~/web/components/Remix';

const title = '图片管理';
export const imageRoute = '/admin/image';

export const meta: MetaFunction = () => {
  return {
    title,
    description: '新建、编辑、删除图片',
  };
};

type LoaderData = {
  ok: boolean;
  data: CountImage[];
  page: number;
  size: number;
  total: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await checkAuth(request);

  const search = new URL(request.url).searchParams;
  const size = Number(search.get('size') || '10');
  const page = Number(search.get('page') || '1');

  const { imageList, count } = await GetImageList({
    size,
    page,
    userId: user.id,
  });

  return json<LoaderData>({
    ok: true,
    data: imageList,
    page: page,
    size: size,
    total: count,
  });
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

export default function ImageList() {
  useTitle(title);

  const fetcher = useFetcher();
  const { classes } = useStyles();
  const data = useLoaderData<LoaderData>();
  const clipboard = useClipboard({ timeout: 500 });

  const renderAction = useCallback((data: CountImage) => {
    return (
      <>
        <UnstyledButton
          onClick={() => {
            clipboard.copy(`${window.location.origin}/img/${data.name}`);
            toast.success('复制成功');
          }}
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
          复制链接
        </UnstyledButton>
        <UnstyledButton
          onClick={async () => {
            await fetcher.submit(
              { id: `${data.id}` },
              { action: `${imageRoute}/delete`, method: 'delete' },
            );
          }}
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
      width: 30,
    },
    {
      name: 'name',
      header: '图片',
      width: 200,
      render: (data: CountImage) => (
        <Image
          height={100}
          width="auto"
          radius="sm"
          src={`/img/${data.name}`}
          withPlaceholder
          placeholder={'图片不存在'}
          alt="背景图片"
        />
      ),
    },
    {
      name: 'article',
      header: '文章',
      width: 120,
      render: (data: CountImage) => data._count.article,
    },
    {
      name: 'action',
      header: '操作',
      width: 120,
      render: renderAction,
    },
  ];

  return (
    <Paper className={classes.main}>
      <Outlet />
      <Stack align="flex-end">
        <Button component={Link} to="add" m={0} size="sm">
          新建图片
        </Button>
      </Stack>
      <Divider mt="md" mb="lg" />
      <Table data={data.data} columns={columns} pagination={data} />
    </Paper>
  );
}
