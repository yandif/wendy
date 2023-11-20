import { register } from '../../demo';
import { Demo01 } from './Demo01';
import { Demo02 } from './Demo02';
import { Demo03 } from './Demo03';
import { Demo04 } from './Demo04';
import { Demo05 } from './Demo05';

register({
  title: 'dayjs 学习',
  component: () => {
    return (
      <>
        <Demo01 />
        <div className="h-10 w-10"></div>
        <Demo02 />
        <div className="h-10 w-10"></div>
        <Demo03 />
        <div className="h-10 w-10"></div>
        <Demo04 />
        <div className="h-10 w-10"></div>
        <Demo05 />
      </>
    );
  },
});
