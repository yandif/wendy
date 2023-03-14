import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ActionFunction, MetaFunction } from '@remix-run/node';
import { useFetcher, useNavigate } from '@remix-run/react';

import { checkAuth } from '~/server/middleware/auth.server';
import { Message } from '~/server/middleware/message.server';
import { CreateTag } from '~/server/models/tag.server';

import { tagRoute } from './admin.tag';

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
  const redirect = formData.get('redirect') as string;
  const description = (formData.get('description') as string) || '';

  if (!name) {
    return await message.error('请确保标签的名称有值!');
  }

  await CreateTag({ name, description, userId: user.id });
  return await message.success('新建成功', { redirect });
};

export default function Add() {
  const form = useForm({
    initialValues: { name: '', description: '', redirect: tagRoute },

    validate: {
      name: (value) => (value?.length === 0 ? '请输入名称' : null),
    },
  });

  const nav = useNavigate();

  const fetcher = useFetcher();
  const handleSave = async () => {
    const res = form.validate();
    if (!res.hasErrors) {
      await fetcher.submit(form.values, {
        method: 'post',
      });
    }
  };

  return (
    <Modal opened title="新建标签" onClose={() => nav(tagRoute)}>
      <fetcher.Form>
        <TextInput
          mb="md"
          required
          label="名称"
          placeholder="标签名称"
          style={{ maxWidth: 400 }}
          {...form.getInputProps('name')}
        />
        <TextInput
          mb="md"
          label="描述"
          placeholder="标签描述"
          style={{ maxWidth: 400 }}
          {...form.getInputProps('description')}
        />

        <Stack align="flex-end">
          <Button onClick={handleSave}> 提交</Button>
        </Stack>
      </fetcher.Form>
    </Modal>
  );
}
