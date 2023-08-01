import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Chrome } from '../../components/Chrome';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(isLeapYear);

export const Demo05 = () => {
  const dateInfo = [
    {
      title: '是否在另一个提供的日期时间之前',
      value: `${dayjs().isBefore(dayjs('2023-08-15'), 'day')}`,
    },
    {
      title: '是否和另一个提供的日期时间相同',
      value: `${dayjs().isSame(dayjs('2023-08-01'), 'month')}`,
    },
    {
      title: '是否在另一个提供的日期时间之后',
      value: `${dayjs().isAfter(dayjs('2023-08-15'), 'day')}`,
    },
    {
      title: '是否和另一个提供的日期时间相同或在其之前',
      value: `${dayjs().isSameOrBefore(dayjs('2023-08-15'), 'day')}`,
    },
    {
      title: '是否和另一个提供的日期时间相同或在其之后',
      value: `${dayjs().isSameOrAfter(dayjs('2023-08-15'), 'day')}`,
    },
    {
      title: '是否在其他两个的日期时间之间',
      value: `${dayjs().isBetween('2023-08-01', '2023-08-30', 'day', '[)')}`,
    },
    {
      title: '一个变量是否为 Day.js 对象',
      value: `${dayjs.isDayjs(dayjs())}`,
    },
    {
      title: '是否是闰年',
      value: `${dayjs().isLeapYear()}`,
    },
  ];

  return (
    <Chrome center={true} tall label="查询">
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
      <a href="https://day.js.org/docs/zh-CN/manipulate/start-of#list-of-all-available-units">
        支持的单位列表
      </a>
    </Chrome>
  );
};
