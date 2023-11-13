import type { Account } from '@prisma/client';

import { auth } from '~/server/utils/index.server';

import { db } from '../database/db.server';

export async function GetAccountById(id: Account['id']) {
  return db.account.findUnique({ where: { id } });
}

export async function GetAccountByUserName(username: Account['username']) {
  return db.account.findUnique({ where: { username } });
}

export async function CreateAccount(
  username: Account['username'],
  password: Account['passwordHash'],
) {
  const md5pwd = auth.makePassword(password);

  return await db.account.create({
    data: {
      username,
      passwordHash: md5pwd,
    },
  });
}
