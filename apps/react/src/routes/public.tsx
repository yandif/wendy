import React from 'react';

const AuthRoutes = React.lazy(() => import('@/features/auth/routes'));

export const publicRoutes = [{ path: 'auth', element: <AuthRoutes /> }];
