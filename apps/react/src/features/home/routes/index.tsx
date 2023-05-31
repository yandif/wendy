import { Route, Routes } from 'react-router-dom';

import { Home } from './Home';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
    </Routes>
  );
};

export default HomeRoutes;
