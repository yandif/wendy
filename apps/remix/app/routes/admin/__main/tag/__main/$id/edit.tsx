import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';

import { checkAuth } from '~/server/middleware/auth.server';
import { Message } from '~/server/middleware/message.server';
import { GetTagById, UpdateTag } from '~/server/models/tag.server';

import { tagRoute } from '../../__main';

export const loader: LoaderFunction = async ({ params, request }) => {
  const message = new Message(request);
  const id = Number(params.id);

  if (!id || isNaN(id)) {
    return await message.error('标签不存在!', { redirect: tagRoute });
  }

  const tag = await GetTagById(id);

  if (!tag) {
    return await message.error('标签不存在!', { redirect: tagRoute });
  }

  return json(tag);
};

export const action: ActionFunction = async ({ request }) => {
  const user = await checkAuth(request);
  const message = new Message(request);

  const formData = await request.formData();
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;
  const description = (formData.get('description') as string) || '';

  const tag = await GetTagById(id);
  if (!tag || tag.accountId !== user.id) {
    return await message.error('保存失败，标签不存在!', { redirect: tagRoute });
  } else {
    await UpdateTag(id, { name, description });
    return await message.success('保存成功', { redirect: tagRoute });
  }
};

export default function Edit() {
  const nav = useNavigate();
  const data = useLoaderData();

  const fetcher = useFetcher();

  const form = useForm({
    initialValues: data,

    validate: {
      name: (value) => (value?.length === 0 ? '请输入名称' : null),
    },
  });

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
          <Button onClick={handleSave}>提交</Button>
        </Stack>
      </fetcher.Form>
    </Modal>
  );
}
