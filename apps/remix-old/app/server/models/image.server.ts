import type { Account, Image } from '@prisma/client';

import { db } from '../database/db.server';

export async function GetImageById(id: Image['id']) {
  return db.image.findUnique({
    where: { id },
    include: { article: true },
  });
}

export interface CountImage extends Image {
  _count: {
    article: number;
  };
}

export type GetImageListType = {
  page: number;
  size: number;
  userId: Account['id'];
};

export async function GetImageList({ page, size, userId }: GetImageListType) {
  if (isNaN(size)) throw new Error('page 不是数字！');
  if (isNaN(page)) throw new Error('page 不是数字！');
  if (!(size > 0)) throw new Error('size 应该大于零！');
  if (!(page > 0)) throw new Error('page 应该大于零！');

  const count = await await db.image.count({
    where: { author: { id: userId } },
  });

  if (page > Math.ceil(count / size) && count !== 0)
    throw new Error('page 太大了！');

  const findImage = await db.image.findMany({
    where: { author: { id: userId } },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      accountId: true,
      _count: {
        select: { article: true },
      },
    },
    skip: (page - 1) * size,
    take: size,
    orderBy: [{ createdAt: 'desc' }],
  });

  return { imageList: findImage, count };
}

export async function DeleteImage(id: Image['id']) {
  return db.image.delete({ where: { id } });
}
