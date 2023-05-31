import React from 'react';

const AntdRoutes = React.lazy(() => import('@/features/antd/routes'));
const AuthRoutes = React.lazy(() => import('@/features/auth/routes'));

export const publicRoutes = [
  { path: 'antd', element: <AntdRoutes /> },
  { path: 'auth', element: <AuthRoutes /> },
];
