import { API_URL, CodeEnum } from '@/config';
import { ResponeData } from '@/services';
import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { authStorage } from '@/utils/storages';
import { unCompile } from '@/utils/tool';
import { historyStore } from '@/stores/history';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  timeout: 10000,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  (config) => {
    const token = authStorage.get();
    if (token) {
      config.headers && (config.headers['token'] = unCompile(token));
    }
    // 文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    // if (config.url.includes("/upload")) {
    //   config.headers["Content-Type"] = "multipart/form-data";
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
  (response) => {
    const data = response?.data || {};
    const { code, message } = data;

    if (code !== CodeEnum.SUCCESS) {
      notification.error({ key: message, message });
      if ([CodeEnum.TOKEN_ERROR, CodeEnum.NO_TOKEN].includes(code)) {
        authStorage.clear();
        historyStore.set('/auth/login');
      }
    }

    return Promise.resolve(data);
  },
  (error: AxiosError) => {
    notification.error({ key: error.message, message: error.message });
    return Promise.reject(error);
  },
);

const create = (method: string) => {
  return (url: string, query?: unknown, config = {}): Promise<ResponeData> => {
    return new Promise((resolve, reject) => {
      const configs: { [key: string]: any } = { method, url, ...config };
      if (['GET', 'DELETE'].includes(method)) {
        configs.params = query;
      } else {
        configs.data = query;
      }
      instance(configs)
        .then((res) => resolve(res as any as ResponeData))
        .catch((e) => reject(e));
    });
  };
};

export default instance;
export const get = create('GET');
export const post = create('POST');
export const put = create('PUT');
export const patch = create('PATCH');
export const del = create('DELETE');
