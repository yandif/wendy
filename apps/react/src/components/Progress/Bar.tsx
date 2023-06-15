import { FC } from 'react';

const Bar: FC<{
  animationDuration: number;
  progress: number;
  color: string;
}> = ({ animationDuration, progress, color }) => (
  <div
    style={{
      background: color,
      height: 3,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'fixed',
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
      zIndex: 1031,
    }}>
    <div
      style={{
        boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
        display: 'block',
        height: '100%',
        opacity: 1,
        position: 'absolute',
        right: 0,
        transform: 'rotate(3deg) translate(0px, -4px)',
        width: 100,
      }}
    />
  </div>
);

export default Bar;
