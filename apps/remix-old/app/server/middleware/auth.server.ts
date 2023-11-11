import { authenticator } from '~/server/auth/auth.server';
import { Message } from '~/server/middleware/message.server';

export const checkAuth = async (request: Request) => {
  const message = new Message(request);
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return await message.error('请重新登录!', { redirect: '/login' });
  }

  return user;
};
