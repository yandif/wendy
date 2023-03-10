import crypto from 'crypto';

import base64 from './Base64.server';
/**
 * @description 生成随机字符串
 * @param length 字符串长度
 * @example
 * const str = random(16);
 */
export const random = (length = 10): string => {
  let str = '';
  const arr =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  for (let i = 0; i < length; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

export default class Auth {
  /**
   * @description 加密密码2
   * @param password 明文密码
   * @example
   * const md5pwd = auth.makePassword('123123');
   * auth.checkPassword('123123', md5pwd);
   */
  public makePassword(password: string): string {
    // 1.生成随机数
    const randomStr = random();
    // 2.对生成的随机数base64加密
    const base64RandomStr = base64.encode(randomStr);
    return this.md5MakePassword(base64RandomStr, password);
  }

  /**
   * @description 校验密码
   * @param password 明文密码
   * @param sqlPwd 加密后的密码
   * @example
   * const md5pwd = auth.makePassword('123123');
   * auth.checkPassword('123123', md5pwd);
   */
  public checkPassword(password: string, sqlPwd: string) {
    // 1.从查询出来的密码中截取前面随机数
    const base64RandomStr = sqlPwd.substring(0, 16);
    const lastPwd = this.md5MakePassword(base64RandomStr, password);
    return Object.is(sqlPwd, lastPwd);
  }

  private md5MakePassword(base64RandomStr: string, password: string): string {
    // 1.将密码与加密的随机数拼接
    const newPwd = base64RandomStr + password;
    // 2.将第二步进行md5加密
    const md5 = crypto.createHash('md5');
    const md5Pwd = md5.update(newPwd).digest('hex');
    // 3.将加密后的md5Pwd继续加密
    const base64Md5 = base64.encode(md5Pwd);
    // 4.继续将1和3拼接
    const lastPwd = base64RandomStr + base64Md5;
    return lastPwd;
  }
}
