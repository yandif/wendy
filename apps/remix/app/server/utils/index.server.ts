import Auth from './Auth.server';

/**
 * @description 生成校验密码
 * @example
 * const md5pwd = auth.makePassword('123123');
 * auth.checkPassword('123123', md5pwd);
 */
export const auth = new Auth();
