import { useAuth } from '@/hooks/useAuth';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from '../components/NotFound';
import AdminLayout from '../layout';
import { Home } from './Home';
import { Account } from './system/Account';
import { Menu } from './system/Menu';
import { Power } from './system/Power';
import { Role } from './system/Role';

const AdminRoutes = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/*" element={<AdminLayout baseName="/admin" />}>
        <Route path="" element={<Navigate to="home" />} />
        <Route index path="home" element={<Home />} />
        <Route path="system/account" element={<Account />} />
        <Route path="system/menu" element={<Menu />} />
        <Route path="system/power" element={<Power />} />
        <Route path="system/role" element={<Role />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
