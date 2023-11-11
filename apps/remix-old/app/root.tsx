import { Box, createEmotionCache, MantineProvider, Title } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import stylesHref from '~/web/styles/index.css';
import {
  commitSession,
  getSession,
  ToastMessage,
} from './server/middleware/message.server';
import ErrorMessage from './web/components/ErrorMessage';
import NotFoundTitle from './web/components/NotFound';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Yandif',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesHref }];
};

type LoaderData = {
  toastMessage: ToastMessage | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));

  const toastMessage = session.get('toastMessage') as ToastMessage;

  if (!toastMessage) {
    return json<LoaderData>({ toastMessage: null });
  }

  if (!toastMessage.type) {
    throw new Error('消息应该有 type 属性');
  }

  return json<LoaderData>(
    { toastMessage },
    { headers: { 'Set-Cookie': await commitSession(session) } },
  );
};

createEmotionCache({ key: 'mantine' });

export default function App() {
  const { toastMessage } = useLoaderData<LoaderData>();

  useEffect(() => {
    if (!toastMessage) return;

    const { message, type } = toastMessage;

    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        throw new Error(`${type} is not handled`);
    }
  }, [toastMessage]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <Toaster />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
          <title>{`${caught.status} ${caught.statusText}`}</title>
        </head>
        <body>
          <NotFoundTitle to="/" />
          <Toaster />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
          <title>Error!</title>
        </head>
        <body>
          <Box>
            <Title order={1}>
              <ErrorMessage
                label="Error!"
                title="程序出现错误"
                description={error.message}
              />
            </Title>
          </Box>
          <Toaster />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
