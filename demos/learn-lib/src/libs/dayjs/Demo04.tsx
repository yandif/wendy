import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Chrome } from '../../components/Chrome';
import { DATE_TIME_FORMAT } from './constant';

export const Demo04 = () => {
  const dateInfo = [
    {
      title: 'format',
      value: dayjs().format(DATE_TIME_FORMAT),
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
    </Chrome>
  );
};
