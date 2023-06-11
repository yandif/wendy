import HomeRoutes from '@/features/home/routes';
import { authStore } from '@/stores/auth';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Computed } from '@legendapp/state/react';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <HomeRoutes /> },
    { path: '*', element: 404 },
  ];

  const routes = authStore.get() ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return (
    <>
      {!!authStore.get() && '登录'}
      <Computed>
        {() => {
          return authStore.get() && '登录';
        }}
      </Computed>
      {element}
    </>
  );
};
