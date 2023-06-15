import { useNProgress } from '@tanem/react-nprogress';
import { FC } from 'react';

import Bar from './Bar';
import Container from './Container';
import Spinner from './Spinner';

const Progress: FC<{
  isAnimating: boolean;
  color?: string;
}> = ({ isAnimating, color = '#007aff' }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar
        animationDuration={animationDuration}
        progress={progress}
        color={color}
      />
      <Spinner color={color} />
    </Container>
  );
};
export default Progress;
