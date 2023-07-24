import { Chrome } from '../../components/Chrome';
import {
  getFirstDayOfMonth,
  getFirstDayOfQuarter,
  getFirstDayOfWeek,
  getFirstDayOfYear,
  getFirstSecondOfDay,
  getLastDayOfMonth,
  getLastDayOfQuarter,
  getLastDayOfWeek,
  getLastDayOfYear,
  getLastSecondOfDay,
} from './utils';

export const Demo01 = () => {
  const dateInfo = [
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
    <Chrome center={true} tall label="获取日期">
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
