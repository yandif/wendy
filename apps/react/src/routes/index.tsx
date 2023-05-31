import HomeRoutes from '@/features/home/routes';
import { authStore } from '@/stores/auth';
import { observer } from 'mobx-react';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = observer(() => {
  const auth = authStore;

  const commonRoutes = [
    { path: '/', element: <HomeRoutes /> },
    { path: '*', element: 404 },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return (
    <>
      {authStore.user && '登录'}
      {element}
    </>
  );
});
