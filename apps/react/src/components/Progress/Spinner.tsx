import { FC } from 'react';

const Spinner: FC<{
  color: string;
}> = ({ color }) => (
  <div
    style={{
      display: 'block',
      position: 'fixed',
      right: 15,
      top: 15,
      zIndex: 1031,
    }}>
    <div
      style={{
        animation: '400ms linear infinite spinner',
        borderBottom: '3px solid transparent',
        borderLeft: `3px solid ${color}`,
        borderRadius: '50%',
        borderRight: '3px solid transparent',
        borderTop: `3px solid ${color}`,
        boxSizing: 'border-box',
        height: 22,
        width: 22,
      }}
    />
  </div>
);

export default Spinner;
