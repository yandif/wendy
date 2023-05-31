import { Route, Routes } from 'react-router-dom';

import { A } from './a';
import { B } from './b';

const AntdRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<A />} />
      <Route path="b" element={<B />} />
    </Routes>
  );
};

export default AntdRoutes;
