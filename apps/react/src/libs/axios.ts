import { API_URL } from '@/config';
import { ResponeData } from '@/services';
import { notification } from 'antd';
import axios from 'axios';
import { authStorage } from '@/utils/storages';

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
      config.headers && (config.headers['token'] = window.btoa(token));
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
    const { code, message, result } = data;

    if (code !== 0) {
      if (code === 10043) {
        authStorage.clear();
        window.location.assign(window.location.origin as unknown as string);
      }
      notification.error({ message });
    }

    return Promise.resolve({ ...data, code, message, data: result });
  },
  (error) => {
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
