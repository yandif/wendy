import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  let user = await db.account.findFirst({
    where: { username: 'me@yandif.com' },
  });
  if (!user) {
    user = await db.account.create({
      data: {
        username: 'me@yandif.com',
        // this is a hashed version of "123123"
        passwordHash:
          'MjZhdmkwa0ZCaQ==Yzk5OGVhZTQ1ZjNhNDVkMjM4MTlkYzgzOWM5ZDkyODM=',
      },
    });
  }
  console.log(user);
}

seed();
