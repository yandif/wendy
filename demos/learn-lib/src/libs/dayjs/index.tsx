import { register } from '../../demo';
import { Demo01 } from './Demo01';

register({
  title: 'dayjs 学习',
  component: () => {
    return (
      <>
        <Demo01 />
      </>
    );
  },
});
