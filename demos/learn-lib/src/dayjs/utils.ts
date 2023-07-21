import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { DATE_TIME_FORMAT } from './constant';

// 季度插件
dayjs.extend(quarterOfYear);
dayjs.locale('zh-cn');

type Unit = dayjs.OpUnitType | 'quarter';

const startOfFactory = (unit: Unit) => {
  return (time?: string, format = DATE_TIME_FORMAT) =>
    dayjs(time).startOf(unit).format(format);
};

const endOfFactory = (unit: Unit) => {
  return (time?: string, format = DATE_TIME_FORMAT) =>
    dayjs(time).endOf(unit).format(format);
};

export const getFirstDayOfYear = startOfFactory('year');
export const getLastDayOfYear = endOfFactory('year');
export const getFirstDayOfQuarter = startOfFactory('quarter');
export const getLastDayOfQuarter = endOfFactory('quarter');
export const getFirstDayOfMonth = startOfFactory('months');
export const getLastDayOfMonth = endOfFactory('months');
export const getFirstDayOfWeek = startOfFactory('week');
export const getLastDayOfWeek = endOfFactory('week');
export const getFirstSecondOfDay = startOfFactory('day');
export const getLastSecondOfDay = endOfFactory('day');
