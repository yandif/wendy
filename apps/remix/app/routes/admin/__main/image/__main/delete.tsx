import type { ActionFunction } from '@remix-run/node';

import { checkAuth } from '~/server/middleware/auth.server';
import { Message } from '~/server/middleware/message.server';
import { DeleteImage, GetImageById } from '~/server/models/image.server';

import { tagRoute } from '../__main';

export const action: ActionFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const message = new Message(request);
  const formData = await request.formData();
  const id = Number(formData.get('id'));

  const messageOptions = { redirect: tagRoute };

  if (!id || isNaN(id)) {
    await message.error('标签不存在!', messageOptions);
  }

  const image = await GetImageById(id);

  if (!image || image.accountId !== user.id) {
    return await message.error('删除失败，图片不存在!', messageOptions);
  }

  if (image && image.article?.length > 0) {
    return await message.error('删除失败，图片有文章使用!', messageOptions);
  }
  await DeleteImage(id);
  return await message.success('删除成功', messageOptions);
};
