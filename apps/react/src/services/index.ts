import { CodeEnum } from '@/config';
import { del, get, patch, post } from '@/libs/axios';
import qs from 'query-string';

export type ResponeData = {
  data?: any;
  code: CodeEnum;
  message: string;
};

export const Role = {
  getPageList(params: { [key: string]: any }) {
    return get(`/role?${qs.stringify(params)}`);
  },
  create(data: any) {
    return post('/role', data);
  },
  edit(id: any, data: any) {
    return patch(`/role/${id}`, data);
  },
  deleteRole(id: any) {
    return del(`/role/${id}`);
  },
};

export const Menu = {
  getPageList(params: { [key: string]: any }) {
    return get(`/role?${qs.stringify(params)}`);
  },
  create(data: any) {
    return post('/role', data);
  },
  edit(id: any, data: any) {
    return patch(`/role/${id}`, data);
  },
  deleteRole(id: any) {
    return del(`/role/${id}`);
  },
};

export const Account = {
  Login(data: { username: any; password: any }) {
    return post('/auth/login', data);
  },
  logout() {
    return get('/auth/logout');
  },
  getMenus() {
    return get('/menus');
  },
  getUserInfo() {
    return get('/account/me');
  },
  getPageList(params: { [key: string]: any }) {
    return get(`/account?${qs.stringify(params)}`);
  },
  createUser(data: any) {
    return post('/account', data);
  },
  editUser(id: any, data: any) {
    return patch(`/account/${id}`, data);
  },
  deleteUser(id: any) {
    return del(`/account/${id}`);
  },
};
