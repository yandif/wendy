import { createCookieSessionStorage } from '@remix-run/node';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_auth', //  在这里使用你想要的任何名称
    path: '/', // 记得添加这个，这样 cookie 就可以在所有路由中工作
    httpOnly: false, // 出于安全原因，将这个 cookie 设为 http only
    sameSite: 'lax', // 这有助于  CSRF
    // domain: 'remix.run',
    maxAge: ONE_WEEK,
    secrets: ['asoidjfzxc1j238019a8sdfjkl234jdaiojfd"AS"DF:'], // 将其替换为实际的 secret
    secure: ['production'].includes(process.env.NODE_ENV), // 仅在 prod 中启用
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
