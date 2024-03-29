import AuthRoutes from '@/features/auth/routes';
import DemoRoutes from '@/features/demo/routes';
import HomeRoutes from '@/features/home/routes';
import { useListener } from '@/hooks/useListener';
import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

const AdminRoutes = React.lazy(() => import('@/features/admin/routes'));

export const publicRoutes: RouteObject[] = [
  { path: '/auth/*', element: <AuthRoutes /> },
  { path: '/admin/*', element: <AdminRoutes /> },
  { path: '/demo/*', element: <DemoRoutes /> },
  { path: '/*', element: <HomeRoutes /> },
  { path: '*', element: 404 },
];

export const AppRoutes = () => {
  useListener();
  return useRoutes(publicRoutes);
};
