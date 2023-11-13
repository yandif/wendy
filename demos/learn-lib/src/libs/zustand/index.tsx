import { register } from '../../demo';
import { Demo01 } from './Demo01';

register({
  title: 'zustand 学习',
  component: () => {
    return (
      <>
        <Demo01 />
        <div className="h-10 w-10"></div>
      </>
    );
  },
});
