import qs from 'query-string';
import { del, get, patch, post } from '@/libs/axios';

export type ResponeData = {
  /**
   * 返回的数据
   */
  data: any;
  /**
   * 状态码:0成功； 1失败；
   */
  code: number;
  /**
   * 消息
   */
  message: string;
};

export const Role = {
  getPageList(params: { [key: string]: any }): Promise<ResponeData> {
    return get(`/role?${qs.stringify(params)}`);
  },
  create(data: any): Promise<ResponeData> {
    return post('/role', data);
  },
  edit(id: any, data: any): Promise<ResponeData> {
    return patch(`/role/${id}`, data);
  },
  deleteRole(id: any): Promise<ResponeData> {
    return del(`/role/${id}`);
  },
};

export const Menu = {
  getPageList(params: { [key: string]: any }): Promise<ResponeData> {
    return get(`/role?${qs.stringify(params)}`);
  },
  create(data: any): Promise<ResponeData> {
    return post('/role', data);
  },
  edit(id: any, data: any): Promise<ResponeData> {
    return patch(`/role/${id}`, data);
  },
  deleteRole(id: any): Promise<ResponeData> {
    return del(`/role/${id}`);
  },
};

export const Account = {
  Login(data: { username: any; password: any }): Promise<ResponeData> {
    return post('/login', data);
  },
  getMenus(): Promise<ResponeData> {
    return get('/menus');
  },
  getUserInfo(): Promise<ResponeData> {
    return get('/account/me');
  },
  getPageList(params: { [key: string]: any }): Promise<ResponeData> {
    return get(`/account?${qs.stringify(params)}`);
  },
  createUser(data: any): Promise<ResponeData> {
    return post('/account', data);
  },
  editUser(id: any, data: any): Promise<ResponeData> {
    return patch(`/account/${id}`, data);
  },
  deleteUser(id: any): Promise<ResponeData> {
    return del(`/account/${id}`);
  },
};
