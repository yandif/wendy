import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import objectSupport from 'dayjs/plugin/objectSupport';
import arraySupport from 'dayjs/plugin/arraySupport';
import utc from 'dayjs/plugin/utc';
import { Chrome } from '../../components/Chrome';
import { DATE_TIME_FORMAT } from './constant';

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(objectSupport);
dayjs.extend(arraySupport);
dayjs.extend(utc);
dayjs.locale('zh-cn');

export const Demo01 = () => {
  const dateInfo = [
    {
      title: '当前时间',
      value: dayjs().format(DATE_TIME_FORMAT),
    },
    {
      title: '字符串 + 格式',
      value: dayjs('2018 三月 15', 'YYYY MMMM DD', 'zh-cn').format(
        DATE_TIME_FORMAT,
      ),
    },
    {
      title: 'Unix 时间戳 (毫秒)',
      value: dayjs(1690792090526).format(DATE_TIME_FORMAT),
    },
    {
      title: 'Unix 时间戳 (秒)',
      value: dayjs.unix(1690792090.526).format(DATE_TIME_FORMAT),
    },
    {
      title: 'Date 对象',
      value: dayjs(new Date()).format(DATE_TIME_FORMAT),
    },
    {
      title: '对象', // 月份从 0 开始计算
      value: dayjs({
        y: 2023,
        M: 6,
        d: 31,
        h: 15,
        m: 10,
        s: 3,
        ms: 123,
      }).format(DATE_TIME_FORMAT),
    },
    {
      title: '数组', // 月份从 0 开始计算
      value: dayjs([2023, 6, 31, 15, 25, 50, 125]).format(DATE_TIME_FORMAT),
    },
    {
      title: 'UTC',
      value: dayjs.utc().local().format(),
    },
    {
      title: 'Dayjs 复制',
      value: (() => {
        const a = dayjs();
        const b = a.clone();
        return b.format(DATE_TIME_FORMAT);
      })(),
    },
    {
      title: '验证',
      value: (() => {
        return `
        不严格：
        ${dayjs('some invalid string').isValid()}
        严格：
        ${dayjs('2022-02-31', 'YYYY-MM-DD', true).isValid()}
        `;
      })(),
    },
  ];

  return (
    <Chrome center={true} tall label="解析日期">
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
        href="https://day.js.org/docs/zh-CN/parse/string-format#%E6%94%AF%E6%8C%81%E7%9A%84%E8%A7%A3%E6%9E%90%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8">
        支持的占位符
      </a>
    </Chrome>
  );
};
