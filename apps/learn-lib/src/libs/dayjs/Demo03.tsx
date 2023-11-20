import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { Chrome } from '../../components/Chrome';
import { DATE_TIME_FORMAT } from './constant';
import {
  getFirstDayOfYear,
  getLastDayOfYear,
  getFirstDayOfQuarter,
  getLastDayOfQuarter,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getFirstSecondOfDay,
  getLastSecondOfDay,
} from './utils';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.locale('zh-cn');

export const Demo03 = () => {
  const dateInfo = [
    {
      title: '增加一定时间',
      value: dayjs().add(7, 'day').format(DATE_TIME_FORMAT),
    },
    {
      title: '增加一定时间 duration', // FIXME: 直接传入duration 对象，返回的是 不合法日期。
      value: dayjs()
        .add(dayjs.duration({ days: 5 }).asMilliseconds(), 'millisecond')
        .format(DATE_TIME_FORMAT),
    },
    {
      title: '减去一定时间',
      value: dayjs().subtract(7, 'day').format(DATE_TIME_FORMAT),
    },
    {
      title: '设置到一个时间的开始',
      value: (() => {
        return <>{dayjs().startOf('year').format(DATE_TIME_FORMAT)}</>;
      })(),
    },
    {
      title: '设置到一个时间的结束',
      value: (() => {
        return <>{dayjs().endOf('year').format(DATE_TIME_FORMAT)}</>;
      })(),
    },
    {
      title: '当前时区模式 utc',
      value: (() => {
        return <>{dayjs.utc().local().format(DATE_TIME_FORMAT)}</>;
      })(),
    },
    {
      title: '一年的第一天',
      value: getFirstDayOfYear(),
    },
    {
      title: '一年的最后一天',
      value: getLastDayOfYear(),
    },
    {
      title: '一季度的第一天',
      value: getFirstDayOfQuarter(),
    },
    {
      title: '一季度的最后一天',
      value: getLastDayOfQuarter(),
    },
    {
      title: '一月的第一天',
      value: getFirstDayOfMonth(),
    },
    {
      title: '一月的最后一天',
      value: getLastDayOfMonth(),
    },
    {
      title: '一周的第一天',
      value: getFirstDayOfWeek(),
    },
    {
      title: '一周的最后一天',
      value: getLastDayOfWeek(),
    },
    {
      title: '一天的第一秒',
      value: getFirstSecondOfDay(),
    },
    {
      title: '一天的最后一秒',
      value: getLastSecondOfDay(),
    },
  ];

  return (
    <Chrome center={true} tall label="操作">
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
      <a
        target="_blank"
        href="https://day.js.org/docs/zh-CN/manipulate/add#%E6%94%AF%E6%8C%81%E7%9A%84%E5%8D%95%E4%BD%8D%E5%88%97%E8%A1%A8">
        加减日期，支持的单位列表
      </a>
      <a
        target="_blank"
        href="https://day.js.org/docs/zh-CN/manipulate/start-of#%E6%94%AF%E6%8C%81%E7%9A%84%E5%8D%95%E4%BD%8D%E5%88%97%E8%A1%A8">
        设置日期，支持的单位列表
      </a>
    </Chrome>
  );
};
