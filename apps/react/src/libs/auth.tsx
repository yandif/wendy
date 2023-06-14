import { Account } from '@/services';
import { authStorage } from '@/utils/storages';
import { configureAuth } from 'react-query-auth';

async function handleUserResponse(data: any) {
  const { jwt, user } = data;
  authStorage.set(jwt);
  return user;
}

async function userFn() {
  if (authStorage.get()) {
    const data = await Account.getUserInfo();
    return data;
  }
  return null;
}

async function loginFn(data: any) {
  const response = await Account.Login(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: any) {
  const response = await Account.Login(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  authStorage.clear();
  window.location.assign(window.location.origin as unknown as string);
}

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn,
  loginFn,
  registerFn,
  logoutFn,
});
