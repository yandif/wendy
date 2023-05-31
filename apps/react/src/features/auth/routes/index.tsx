import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
