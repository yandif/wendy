import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import {
  Adjustments,
  Backpack,
  Folders,
  Gauge,
  Message2,
  MessageDots,
  Notes,
  Photo,
  Tags,
} from 'tabler-icons-react';

import { authenticator } from '~/server/auth/auth.server';
import MantineProvider from '~/web/components/MantineProvider';
import AdminLayout from '~/web/layouts/admin';
import useAdminStore from '~/web/stores/admin';
import stylesHref from '~/web/styles/admin.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesHref }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const site = {
    title: '管理界面',
  };

  return json({ user, site });
};

const mockdata = [
  { label: '看板', icon: Gauge, link: '/dashboard' },

  { label: '公告管理', icon: MessageDots, link: '/announcement' },
  { label: '分类管理', icon: Folders, link: '/category' },
  { label: '标签管理', icon: Tags, link: '/tag' },
  { label: '图片管理', icon: Photo, link: '/image' },
  {
    label: '文章管理',
    icon: Notes,
    initiallyOpened: true,
    links: [
      { label: '文章列表', link: '/article/list' },
      { label: '写文章', link: '/article/create' },
    ],
  },
  { label: '评论管理', icon: Message2, link: '/comment' },
  { label: '反馈管理', icon: Backpack, link: '/feedback' },
  { label: '系统设置', icon: Adjustments, link: '/setting' },
];

export default function AdminLayoutWrapper() {
  const { user, site } = useLoaderData();
  const { setUser, setSizeName, setMenus, setHeaderTitle } = useAdminStore();

  useEffect(() => {
    setUser(user);
    setSizeName(site.title);
    setMenus(mockdata);
    setHeaderTitle('');
  }, []);

  return (
    <MantineProvider>
      <AdminLayout />
    </MantineProvider>
  );
}
