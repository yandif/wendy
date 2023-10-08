import { Link } from '@remix-run/react';
import type { FC } from 'react';

const Index: FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="admin">管理端</Link>
      <br />
      <Link to="blog">博客</Link>
      <br />
      <Link to="demo">Demo</Link>
    </div>
  );
};

export default Index;
