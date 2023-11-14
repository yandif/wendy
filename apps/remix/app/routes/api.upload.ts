import type { ActionFunction } from '@remix-run/node';
import { unstable_createFileUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node';

import { db } from '~/server/database/db.server';
import { checkAuth } from '~/server/middleware/auth.server';
import { Message } from '~/server/middleware/message.server';

export const action: ActionFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const message = new Message(request);
  const uploadHandler = unstable_createFileUploadHandler({
    directory: 'public/img',
    // file: ({ filename }) => filename,
    maxPartSize: 5_000_000,
  });
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const image = formData.get('img') as any;

  if (!image) {
    return await message.error('上传失败！');
  }
  const img = await db.image.create({
    data: { name: image.name, author: { connect: { id: user.id } } },
  });
  return await message.success('上传成功！', { data: img });
};
