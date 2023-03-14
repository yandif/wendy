import { createStyles, Modal } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import type { ActionFunction, MetaFunction } from '@remix-run/node';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { checkAuth } from '~/server/middleware/auth.server';
import { Message } from '~/server/middleware/message.server';
import { CreateTag } from '~/server/models/tag.server';
import { UploadImage } from '~/web/components/Upload/ImgUpload';

import { imageRoute } from './admin.image';

export const meta: MetaFunction = () => {
  return {
    title: '新建标签',
    description: '新建标签',
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const message = new Message(request);

  const formData = await request.formData();
  const name = formData.get('name') as string;
  const description = (formData.get('description') as string) || '';

  if (!name) {
    return await message.error('请确保标签的名称有值!');
  }

  await CreateTag({ name, description, userId: user.id });
  return await message.success('新建成功', { redirect: imageRoute });
};

const useStyles = createStyles((theme) => {
  return {};
});

export default function Add() {
  const { theme } = useStyles();

  const [cover, setCover] = useState<any>();

  const nav = useNavigate();

  const imgFetcher = useFetcher();
  const handleUpload = (file: any) => {
    imgFetcher.submit(
      { img: file },
      {
        encType: 'multipart/form-data',
        action: '/api/upload',
        method: 'post',
      },
    );
  };
  useEffect(() => {
    if (imgFetcher.data?.data) {
      setCover(imgFetcher.data.data);
      setTimeout(() => nav('../'), 1000);
    }
  }, [imgFetcher.data]);
  const coverSrc = cover?.name ? `/img/${cover?.name}` : undefined;

  return (
    <Modal opened title="新建图片" onClose={() => nav(imageRoute)}>
      <UploadImage
        p={2}
        loading={imgFetcher.state === 'loading'}
        multiple={false}
        onDrop={(files) => handleUpload(files[0])}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        onReject={() => {
          toast.error('图片不能大于5M');
        }}
        imgSrc={coverSrc}
      />
    </Modal>
  );
}
