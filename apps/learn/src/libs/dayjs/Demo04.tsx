import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import toArray from 'dayjs/plugin/toArray';
import toObject from 'dayjs/plugin/toObject';
import { Chrome } from '../../components/Chrome';
import { DATE_TIME_FORMAT } from './constant';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(toArray);
dayjs.extend(toObject);

dayjs.locale('zh-cn');

export const Demo04 = () => {
  const dateInfo = [
    {
      title: '格式化',
      value: dayjs().format(DATE_TIME_FORMAT),
    },
    {
      title: '返回现在到当前实例的相对时间',
      value:
        dayjs('2023-07-31').fromNow() +
        ' / ' +
        dayjs('2023-07-31').fromNow(true),
    },
    {
      title: '返回 x 到当前实例的相对时间',
      value:
        dayjs('2023-07-31').from(dayjs('2023-08-5')) +
        ' / ' +
        dayjs('2023-07-31').from(dayjs('2023-08-5'), true),
    },
    {
      title: '返回当前实例到现在的相对时间',
      value:
        dayjs('2023-07-01').toNow() + ' / ' + dayjs('2023-07-31').toNow(true),
    },
    {
      title: '返回当前实例到x的相对时间',
      value:
        dayjs('2023-07-31').to(dayjs('2023-08-5')) +
        ' / ' +
        dayjs('2023-07-31').to(dayjs('2023-08-5'), true),
    },
    {
      title: '日历时间显示了距离给定时间的相对时间',
      value: dayjs().calendar() + ' / ' + dayjs().calendar(dayjs('2023-08-5')),
    },
    {
      title: '返回指定单位下两个日期时间之间的差异',
      value: dayjs('2023-07-31').diff(dayjs(), 'hour'),
    },
    {
      title: '返回当前实例的UNIX时间戳，13位毫秒',
      value: dayjs().valueOf(),
    },
    {
      title: '返回当前实例的UNIX时间戳，10位秒',
      value: dayjs().unix(),
    },
    { title: '获取当前月份包含的天数', value: dayjs().daysInMonth() },
    { title: '获取原生的 Date 对象', value: dayjs().toDate().toLocaleString() },
    {
      title: '返回一个包含各个时间信息的 Array',
      value: JSON.stringify(dayjs().toArray()),
    },
    {
      title: '序列化为 ISO 8601 格式的字符串',
      value: dayjs().toJSON(),
    },
    {
      title: '返回一个 ISO 8601 格式的字符串',
      value: dayjs().toISOString(),
    },
    {
      title: '返回包含时间信息的 Object',
      value: JSON.stringify(dayjs().toObject()),
    },
    {
      title: '返回包含时间信息的 string',
      value: dayjs().toString(),
    },
  ];

  return (
    <Chrome center={true} scrollable="y" tall label="显示">
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
      <a href="https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8">
        支持的格式化占位符列表
      </a>
      <a href="https://day.js.org/docs/zh-CN/display/from-now#%E6%97%B6%E9%97%B4%E8%8C%83%E5%9B%B4%E5%88%92%E5%88%86%E6%A0%87%E5%87%86">
        时间范围划分标准
      </a>
      <a href="https://day.js.org/docs/zh-CN/display/difference#%E6%94%AF%E6%8C%81%E7%9A%84%E5%8D%95%E4%BD%8D%E5%88%97%E8%A1%A8">
        差异支持的单位列表
      </a>
    </Chrome>
  );
};
