import type { ActionFunction } from '@remix-run/node';

import { checkAuth } from '~/server/middleware/auth.server';
import { Message } from '~/server/middleware/message.server';
import { DeleteTag, GetTagById } from '~/server/models/tag.server';

import { tagRoute } from '../__main';

export const action: ActionFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const message = new Message(request);
  const formData = await request.formData();
  const id = Number(formData.get('id'));

  if (!id || isNaN(id)) {
    await message.error('标签不存在!', { redirect: tagRoute });
  }

  const tag = await GetTagById(id);
  if (!tag || tag.accountId !== user.id) {
    return await message.error('删除失败，标签不存在!');
  } else {
    await DeleteTag(id);
    return await message.success('删除成功');
  }
};
