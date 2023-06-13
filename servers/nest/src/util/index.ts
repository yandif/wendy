/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import * as dayjs from 'dayjs'
import { URL } from 'url'
import * as crypto from 'crypto'
import base64 from './Base64'
import random from './random'

/**
 * @description 转换时间格式
 * @example
 * formatDate(new Date()) //2021-08-14
 * formatDate(new Date(),true) //2021-08-14 00:25:49
 * @param dateNum
 * @param isHourMinuteSecond
 * @returns
 */
export const formatDate = (dateNum, isHourMinuteSecond = false): string => {
  if (!dateNum) {
    return ''
  }
  return dayjs(dateNum).format(`YYYY-MM-DD${isHourMinuteSecond ? ' HH:mm:ss' : ''}`)
}

export class Auth {
  public makePassword(password: string): string {
    // 1.生成随机数
    const randomStr = random()
    // 2.对生成的随机数base64加密
    const base64RandomStr = base64.encode(randomStr)
    return this.md5MakePassword(base64RandomStr, password)
  }

  public checkPassword(password: string, sqlPwd: string) {
    // 1.从查询出来的密码中截取前面随机数
    const base64RandomStr = sqlPwd.substring(0, 16)
    const lastPwd = this.md5MakePassword(base64RandomStr, password)
    return Object.is(sqlPwd, lastPwd)
  }

  private md5MakePassword(base64RandomStr: string, password: string): string {
    // 2.将密码与加密的随机数拼接
    const newPwd = base64RandomStr + password
    // 3.将第二步进行md5加密
    const md5 = crypto.createHash('md5')
    const md5Pwd = md5.update(newPwd).digest('hex')
    // 4.将加密后的md5Pwd继续加密
    const base64Md5 = base64.encode(md5Pwd)
    // 5.继续将2和4拼接
    const lastPwd = base64RandomStr + base64Md5
    return lastPwd
  }
}

export const uniqWith = (arr, key) => {
  if (!arr) return arr
  if (key === undefined) return [...new Set(arr)]
  const map = {
    string: (e) => e[key],
    function: (e) => key(e),
  }
  const fn = map[typeof key]
  const obj = arr.reduce((o, e) => ((o[fn(e)] = e), o), {})
  return Object.values(obj)
}

export const getUrlQuery = (urlPath: string, key: string): string | null => {
  const url = new URL(`http://localohst${urlPath}`)
  const params = new URLSearchParams(url.search.substring(1))
  return params.get(key)
}

const toString = Object.prototype.toString
export const isObject = (obj: any) => {
  return Object.is(toString.call(obj), '[object Object]')
}
