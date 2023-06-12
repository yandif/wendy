import { authStore } from '@/stores/auth';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { API_URL } from '@/config';

export const AppRoutes = () => {
  const routes = authStore.get() ? protectedRoutes : [];
  console.log(API_URL);
  return useRoutes([...routes, ...publicRoutes]);
};
