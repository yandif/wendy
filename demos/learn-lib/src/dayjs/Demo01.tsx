import dayjs from 'dayjs';

export const Demo01 = () => {
  console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  console.log(dayjs().startOf('months').format('YYYY-MM-DD HH:mm:ss'));
  console.log(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'));
  return <></>;
};
