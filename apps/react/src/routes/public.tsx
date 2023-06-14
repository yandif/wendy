import HomeRoutes from '@/features/home/routes';
import React from 'react';
import { RouteObject } from 'react-router-dom';

const AuthRoutes = React.lazy(() => import('@/features/auth/routes'));

export const publicRoutes: RouteObject[] = [
  { path: '/auth/*', element: <AuthRoutes /> },
  { path: '/', element: <HomeRoutes /> },
  { path: '*', element: 404 },
];
