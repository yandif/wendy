import { Route, Routes } from 'react-router-dom';
import DemoLayout from '../layout/index';
import asyncRouter from '@/utils/asyncRouter';

const VirtualScroll = asyncRouter(() => import('./VirtualScroll'));

const DemoRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<DemoLayout />}>
        <Route path="virtual-scroll" element={<VirtualScroll />} />
      </Route>
    </Routes>
  );
};

export default DemoRoutes;
