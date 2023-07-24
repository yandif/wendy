import { register } from '../../demo';
import { Demo01 } from './Demo01';

register({
  title: 'ts-pattern 学习',
  component: () => {
    return (
      <>
        <Demo01 />
      </>
    );
  },
});
