import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import minMax from 'dayjs/plugin/minMax';
import { Chrome } from '../../components/Chrome';
import { DATE_TIME_FORMAT } from './constant';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.extend(minMax);

dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

dayjs.locale('zh-cn');

export const Demo02 = () => {
  const dateInfo = [
    {
      title: '获取或设置毫秒',
      value: (() => {
        return (
          <>
            <span>{dayjs().millisecond(30).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().millisecond()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置秒',
      value: (() => {
        return (
          <>
            <span>{dayjs().second(30).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().second()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置分钟',
      value: (() => {
        return (
          <>
            <span>{dayjs().minute(30).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().minute()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置小时',
      value: (() => {
        return (
          <>
            <span>{dayjs().hour(12).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().hour()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置月份里的日期',
      value: (() => {
        return (
          <>
            <span>{dayjs().date(12).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().date()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置星期几',
      value: (() => {
        return (
          <>
            <span>{dayjs().day(6).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().day()}</span>
          </>
        );
      })(),
    },
    {
      title: '根据本地化配置获取或设置星期几',
      value: (() => {
        return (
          <>
            <span>{dayjs().weekday(6).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().weekday()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置 ISO 星期几',
      value: (() => {
        return (
          <>
            <span>{dayjs().isoWeekday(1).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().isoWeekday()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置年份里第几天',
      value: (() => {
        return (
          <>
            <span>{dayjs().dayOfYear(300).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().dayOfYear()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置该年的第几周',
      value: (() => {
        return (
          <>
            <span>{dayjs().week(26).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().week()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置年份的 ISO 星期',
      value: (() => {
        return (
          <>
            <span>{dayjs().isoWeek(26).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().isoWeek()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置月份', // 月份是从 0 开始计算的，即 1 月是 0。
      value: (() => {
        return (
          <>
            <span>{dayjs().month(5).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().month()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置季度',
      value: (() => {
        return (
          <>
            <span>{dayjs().quarter(2).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().quarter()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取或设置年份',
      value: (() => {
        return (
          <>
            <span>{dayjs().year(2024).format(DATE_TIME_FORMAT)}</span>
            <span> {dayjs().year()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取基于当前语言配置的按周计算的年份',
      value: (() => {
        return (
          <>
            <span> {dayjs().weekYear()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取 ISO 周年',
      value: (() => {
        return (
          <>
            <span> {dayjs().isoWeekYear()}</span>
          </>
        );
      })(),
    },
    {
      title: '获取当前年份的周数，根据 ISO weeks的定义',
      value: (() => {
        return (
          <>
            <span> {dayjs().isoWeeksInYear()}</span>
          </>
        );
      })(),
    },
    {
      title: '从 Day.js 对象中获取相应信息的 getter',
      value: (() => {
        // month 和 day 从 0 开始
        return (
          <>
            {dayjs().get('year')} {dayjs().get('month')} {dayjs().get('date')}{' '}
            {dayjs().get('hour')} {dayjs().get('minute')}{' '}
            {dayjs().get('second')} {dayjs().get('millisecond')}
            <br />
            {dayjs().get('day')}
          </>
        );
      })(),
    },
    {
      title: '最远的未来',
      value: (() => {
        return (
          <>
            {dayjs
              .max(dayjs(), dayjs('2024-01-01'), dayjs('2019-01-01'))
              ?.format(DATE_TIME_FORMAT)}
          </>
        );
      })(),
    },
    {
      title: '最远的过去',
      value: (() => {
        return (
          <>
            {dayjs
              .min(dayjs(), dayjs('2024-01-01'), dayjs('2000-01-01'))
              ?.format(DATE_TIME_FORMAT)}
          </>
        );
      })(),
    },
  ];

  return (
    <Chrome center={true} scrollable="y" tall label="取值/赋值">
      dayjs 对象是不可变的，所有设置操作将返回一个新的 dayjs 实例
      <table>
        <tbody>
          {dateInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.title}：</td>
              <td>{info.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Chrome>
  );
};
