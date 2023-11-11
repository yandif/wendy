import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import MantineProvider from '~/web/components/MantineProvider';
import stylesHref from '~/web/styles/admin.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesHref }];
};

const AuthRoot = () => {
  return (
    <MantineProvider>
      <Outlet />
    </MantineProvider>
  );
};

export default AuthRoot;
