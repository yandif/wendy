export const API_URL = import.meta.env.VITE_API_URL as string;
export const NODE_ENV = import.meta.env.NODE_ENV as string;
export const JWT_SECRET = import.meta.env.JWT_SECRET as string;

export enum CodeEnum {
  /** 成功 */
  SUCCESS = 0,
  /** 失败 */
  FAILED = 1,
  /** 用户名或密码错误 */
  USERNAME_OR_PASSWORD_ERROR = 10040,
  /** 没传递token */
  NO_TOKEN = 10042,
  /** token错误 */
  TOKEN_ERROR = 10043,
}
