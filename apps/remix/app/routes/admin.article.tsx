import { Outlet } from '@remix-run/react';

export { CatchBoundary, ErrorBoundary } from '~/web/components/Remix';

export default function Article() {
  return <Outlet />;
}
