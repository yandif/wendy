import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layout';
import { Home } from './Home';
import { useAuth } from '@/hooks/useAuth';

const AdminRoutes = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
