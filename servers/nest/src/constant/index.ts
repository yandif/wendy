// 正则
export const usernameReg = /^[a-zA-Z.0-9]{4,20}$/
export const minMoneyReg = /^[1-9](\d+)?(\.\d{2,2})?$/

// 账户的默认密码
export const defaultPassword = '123456'

// 分页默认配置
export const defaultPageSize = 10
export const defaultPageNumber = 1

/** 自定义api守卫的key，用于反射 */
export const API_AUTH_KEY = '@@api_auth_key'
