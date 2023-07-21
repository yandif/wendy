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
  return (
    <div>
      <h1>dayjs Demo</h1>
      <p>一年的第一天：{getFirstDayOfYear()}</p>
      <p>一年的最后一天：{getLastDayOfYear()}</p>
      <p>一季度的第一天：{getFirstDayOfQuarter()}</p>
      <p>一季度的最后一天：{getLastDayOfQuarter()}</p>
      <p>一月的第一天：{getFirstDayOfMonth()}</p>
      <p>一月的最后一天：{getLastDayOfMonth()}</p>
      <p>一周的第一天：{getFirstDayOfWeek()}</p>
      <p>一周的最后一天：{getLastDayOfWeek()}</p>
      <p>一天的第一秒：{getFirstSecondOfDay()}</p>
      <p>一天的最后一秒：{getLastSecondOfDay()}</p>
    </div>
  );
};
