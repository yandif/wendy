import type { LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/server/auth/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};
