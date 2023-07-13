import { observer } from '@legendapp/state/react';
import { Link, Outlet } from 'react-router-dom';

const DemoLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: '200px',
          padding: 16,
          background: '#eee',
        }}>
        <Link to={'/demo/virtual-scroll'}>虚拟滚动</Link> <br />
      </div>
      <div
        style={{
          padding: 16,
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default observer(DemoLayout);
