import { Box, Button, Center, Group, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { useEffect, useRef } from 'react';

import { authenticator } from '~/server/auth/auth.server';
import useThemeStore from '~/web/stores/theme';

export { CatchBoundary, ErrorBoundary } from '~/web/components/Remix';

export const meta: MetaFunction = () => {
  return [{ title: '登录', description: 'Yandif应用登录' }];
};

export type LoaderData = {
  ok: boolean;
  message?: string;
  data?: any;
};

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/admin/dashboard',
  });
};

export type actionData = {
  ok: boolean;
  message?: string;
  data?: any;
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.authenticate('user-pass', request, {
    successRedirect: '/admin/dashboard',
  });
  return json(user);
};

export default function Login() {
  const actionData = useActionData();
  const { colorScheme, setColorScheme } = useThemeStore();

  type FormData = { username?: string; password?: string };
  const ref = useRef<HTMLFormElement>(null);

  const form = useForm<FormData>({
    initialValues: actionData?.data || { username: '', password: '' },
    validate: {
      username: (value?: string) => {
        if (!value) return '请输入邮箱';
        if (!/^\S+@\S+$/.test(value)) return '无效邮箱';
        if (value === actionData?.errorData?.username) return '邮箱不存在';
      },
      password: (value?: string) => {
        if (!value) return '请输入密码';
        if (value.length < 6) return '密码不能少于6位';
        if (value === actionData?.errorData?.password) return '密码错误';
      },
    },
  });

  useEffect(() => {
    if (actionData?.failed) {
      setColorScheme(actionData.themeColor);
      form?.validate();
    }
  }, []);

  const handleSubmit = () => {
    console.log('123');
    if (!ref.current) return;
    const res = form.validate();

    if (!res?.hasErrors) {
      ref.current.submit();
    }
  };

  return (
    <Paper style={{ height: '100vh' }}>
      <Box sx={{ maxWidth: 340 }} mx="auto" pt={100}>
        <Center>
          <h1>登录</h1>
        </Center>

        <Form ref={ref} method="post">
          <TextInput
            name="themeColor"
            onChange={() => {}}
            value={colorScheme}
            style={{ display: 'none' }}
          />
          <TextInput
            mt="md"
            label="邮箱"
            name="username"
            autoComplete="username"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            mt="md"
            label="密码"
            name="password"
            autoComplete="current-password"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="md">
            <Link style={{ textDecoration: 'none', color: '#777' }} to="/signup">
              还没有账号？去注册
            </Link>

            <Button onClick={handleSubmit}>登录</Button>
          </Group>
        </Form>
      </Box>
    </Paper>
  );
}
