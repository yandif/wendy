/** 角色枚举类型 */
export enum RoleEnum {
  /** 正常角色 */
  NORMAL = 0,
  /** 正常 */
  DEFAULT = 1,
}

/** 角色描素 */
export const RoleMessage = {
  0: '正常分配的角色',
  1: '系统默认的角色',
}

/** 资源类型枚举类型 */
export enum AccessTypeEnum {
  /** 模块 */
  MODULE = 1,
  /** 菜单 */
  MENUS = 2,
  /** 操作(API) */
  OPERATION = 3,
}

/** 资源类型枚举描素 */
export const AccessTypeMessage = {
  1: '模块',
  2: '菜单',
  3: '操作(API)',
}

/** 后台管理账号身份枚举类型 */
export enum AdminIdentityEnum {
  /** 普通账号 */
  NORMAL = 0,
  /** 超级管理员 */
  SUPPER = 1,
}

/** 后台管理账号身份描素 */
export const AdminIdentityMessage = {
  0: '普通账号',
  1: '超级管理员',
}

/** 定义返回错误的code */
export enum CodeEnum {
  /** 没传递token */
  NO_TOKEN = 10042,
  /** token错误 */
  TOKEN_ERROR = 10043,
}

/** 错误的code文字描素 */
export const CodeMessage = {
  10042: '你还没登录,请先登录',
  10043: '登录失效，请重新登录',
}
