import type { LinksFunction } from '@remix-run/node';

import MantineProvider from '~/web/components/MantineProvider';
import BlogLayout from '~/web/layouts/blog';
import stylesHref from '~/web/styles/admin.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesHref }];
};

export default function AdminLayoutWrapper() {
  return (
    <MantineProvider>
      <BlogLayout />
    </MantineProvider>
  );
}
