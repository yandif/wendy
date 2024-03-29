import {
  Button,
  createStyles,
  Divider,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { useCallback } from 'react';

import { checkAuth } from '~/server/middleware/auth.server';
import type { CountTag } from '~/server/models/tag.server';
import { GetTagList } from '~/server/models/tag.server';
import Table from '~/web/components/Table';
import { useTitle } from '~/web/hooks/useTitle';

export { CatchBoundary, ErrorBoundary } from '~/web/components/Remix';

const title = '标签管理';
export const tagRoute = '/admin/tag';

export const meta: MetaFunction = () => {
  return {
    title,
    description: '新建、编辑、删除标签',
  };
};

type LoaderData = {
  ok: boolean;
  data: CountTag[];
  page: number;
  size: number;
  total: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await checkAuth(request);

  const search = new URL(request.url).searchParams;
  const size = Number(search.get('size') || '10');
  const page = Number(search.get('page') || '1');

  const { tagList, count } = await GetTagList({ size, page, userId: user.id });

  return json<LoaderData>({
    ok: true,
    data: tagList,
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

export default function TagList() {
  useTitle(title);

  const fetcher = useFetcher();
  const { classes } = useStyles();
  const data = useLoaderData<LoaderData>();

  const renderAction = useCallback((data: CountTag) => {
    return (
      <>
        <UnstyledButton
          component={Link}
          to={`${data.id}/edit`}
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
          onClick={async () => {
            await fetcher.submit(
              { id: `${data.id}` },
              { action: `${tagRoute}/delete`, method: 'delete' },
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
      header: '名称',
      width: 200,
    },
    {
      name: 'description',
      header: '描述',
      width: 200,
    },
    {
      name: 'article',
      header: '文章',
      width: 120,
      render: (data: CountTag) => data._count.article,
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
          新建标签
        </Button>
      </Stack>
      <Divider mt="md" mb="lg" />
      <Table data={data.data} columns={columns} pagination={data} />
    </Paper>
  );
}
