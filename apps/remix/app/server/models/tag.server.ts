import type { Account, Tag } from '@prisma/client';

import { db } from '../database/db.server';

export async function GetTagById(id: Tag['id']) {
  return db.tag.findUnique({ where: { id } });
}

export interface CountTag extends Tag {
  _count: {
    article: number;
  };
}

export type GetTagListType = {
  page: number;
  size: number;
  userId: Account['id'];
};

export async function GetTagList({ page, size, userId }: GetTagListType) {
  if (isNaN(size)) throw new Error('page 不是数字！');
  if (isNaN(page)) throw new Error('page 不是数字！');
  if (!(size > 0)) throw new Error('size 应该大于零！');
  if (!(page > 0)) throw new Error('page 应该大于零！');

  const count = await await db.tag.count({ where: { author: { id: userId } } });

  if (page > Math.ceil(count / size) && count !== 0)
    throw new Error('page 太大了！');

  const findTag = await db.tag.findMany({
    where: { author: { id: userId } },
    select: {
      id: true,
      name: true,
      description: true,
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

  return { tagList: findTag, count };
}

export type CreateTagType = {
  name: Tag['name'];
  description: Tag['description'];
  userId: Account['id'];
};

export async function CreateTag({ name, description, userId }: CreateTagType) {
  return db.tag.create({
    data: {
      name,
      description,
      author: { connect: { id: userId } },
    },
  });
}

export type UpdateTagType = {
  name: Tag['name'];
  description: Tag['description'];
};

export async function UpdateTag(
  id: Tag['id'],
  { name, description }: UpdateTagType,
) {
  return db.tag.update({
    where: { id: id },
    data: {
      name,
      description,
    },
  });
}

export async function DeleteTag(id: Tag['id']) {
  return db.tag.delete({ where: { id } });
}
