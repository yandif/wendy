import { progressStore } from '@/stores/progress';
import { observer } from '@legendapp/state/react';
import { FC } from 'react';
import IProgress from './Progress';
import './index.less';

const Progress: FC = () => {
  return <IProgress isAnimating={progressStore.get()} color="#1677ff" />;
};

export default observer(Progress);
