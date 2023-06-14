import AuthRoutes from '@/features/auth/routes';
import HomeRoutes from '@/features/home/routes';
import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

const AdminRoutes = React.lazy(() => import('@/features/admin/routes'));

export const publicRoutes: RouteObject[] = [
  { path: '/auth/*', element: <AuthRoutes /> },
  { path: '/admin/*', element: <AdminRoutes /> },
  { path: '/', element: <HomeRoutes /> },
  { path: '*', element: 404 },
];

export const AppRoutes = () => useRoutes(publicRoutes);
