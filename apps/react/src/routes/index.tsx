import { authStore } from '@/stores/auth';
import { observer } from 'mobx-react';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = observer(() => {
  const auth = authStore;
  const commonRoutes = [{ path: '/', element: '加载中' }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
});
