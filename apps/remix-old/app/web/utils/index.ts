import dayjs from 'dayjs';

/**
 * @description 转换时间格式
 * @example
 * formatDate(new Date()) //2021-08-14
 * formatDate(new Date(),true) //2021-08-14 00:25:49
 * @param dateNum
 * @param isHourMinuteSecond
 * @returns
 */
export const formatDate = (
  dateNum?: Date | number,
  isHourMinuteSecond = false,
): string => {
  if (!dateNum) {
    return '';
  }
  return dayjs(dateNum).format(
    `YYYY-MM-DD${isHourMinuteSecond ? ' HH:mm:ss' : ''}`,
  );
};

/**
 * @description 判断是否是对象
 * @example
 * isObject({}) // true
 * isObject([]) // false
 */
export const isObject = (obj: unknown) => {
  return Object.is(Object.prototype.toString.call(obj), '[object Object]');
};

/**
 * @description 休眠
 * @example
 * sleep(1000) // 休眠一秒
 */
export const sleep = (t = 1000) => {
  return new Promise((r) => setTimeout(() => r(0), t));
};
