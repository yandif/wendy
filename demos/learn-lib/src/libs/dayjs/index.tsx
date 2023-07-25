import { register } from '../../demo';
import { Demo01 } from './Demo01';
import { Demo05 } from './Demo05';

register({
  title: 'dayjs 学习',
  component: () => {
    return (
      <>
        <Demo01 />
        <div className="h-10 w-10"></div>
        <Demo05 />
      </>
    );
  },
});
