import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Suspense fallback={123}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [],
  },
];
