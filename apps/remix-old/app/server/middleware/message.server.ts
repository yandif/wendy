import type { Session } from '@remix-run/node';
import { createCookieSessionStorage, json, redirect } from '@remix-run/node';

export type ToastMessage = { message: string; type: 'success' | 'error' };

export const { commitSession, getSession } = createCookieSessionStorage({
  cookie: {
    name: '__message',
    // domain: 'remix.run',
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secrets: ['zxcvjaiorjlkanj12378931274hjkhy678a6r'],
    secure: ['production'].includes(process.env.NODE_ENV),
  },
});

export function setSuccessMessage(session: Session, message: string) {
  session.flash('toastMessage', { message, type: 'success' } as ToastMessage);
}

export function setErrorMessage(session: Session, message: string) {
  session.flash('toastMessage', { message, type: 'error' } as ToastMessage);
}

type MessageOptions = { redirect?: string; data?: any };
export class Message {
  request: Request;
  constructor(request: Request) {
    this.request = request;
  }
  async success(message = '成功', options: MessageOptions = {}) {
    const session = await getSession(this.request.headers.get('cookie'));

    if (options.redirect) {
      setSuccessMessage(session, message);
      return redirect(options.redirect, {
        headers: { 'Set-Cookie': await commitSession(session) },
      });
    }

    setSuccessMessage(session, message);
    return json(
      { ok: true, data: options.data },
      {
        headers: { 'Set-Cookie': await commitSession(session) },
      },
    );
  }

  async error(message = '失败', options: MessageOptions = {}) {
    const session = await getSession(this.request.headers.get('cookie'));

    if (options.redirect) {
      setErrorMessage(session, message);
      return redirect(options.redirect, {
        headers: { 'Set-Cookie': await commitSession(session) },
      });
    }

    setErrorMessage(session, message);
    return json(
      { ok: false, data: options.data },
      {
        headers: { 'Set-Cookie': await commitSession(session) },
      },
    );
  }
}
