import { Link } from '@remix-run/react';
import type { FC } from 'react';

const Index: FC = () => {
  return (
    <div>
      <h1>Demo</h1>
      <Link to="scroll">滚动到底部触发</Link>
      <br />
      <Link to="toast">弹出搜索框</Link>
      <br />
      <Link to="dnd">拖拽</Link>
      <br />
      <Link to="useReducer">useReducer</Link>
      <br />
      <Link to="learn">学习</Link>
      <br />
    </div>
  );
};

export default Index;
