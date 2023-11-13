import _ from 'lodash';
import { Authenticator } from 'remix-auth';

import { sessionStorage } from '~/server/auth/session.server';
import { FormStrategy } from '~/server/auth/strategy.server';
import { auth } from '~/server/utils/index.server';

import { GetAccountByUserName } from '../models/account.server';

export const authenticator = new Authenticator<any>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username') as string;
    const password = form.get('password') as string;
    const themeColor = form.get('themeColor');

    const createError = (errorData: any) => ({
      failed: true,
      data: { username, password },
      errorData,
      themeColor,
    });

    const findUser = await GetAccountByUserName(username);

    if (!findUser) {
      // 用户名不存在
      return createError({ username });
    }

    if (!auth.checkPassword(password, findUser.passwordHash)) {
      // 密码错误
      return createError({ password });
    }

    return {
      failed: false,
      data: _.omit(findUser, 'passwordHash'),
      themeColor,
    };
  }),
  'user-pass',
);
