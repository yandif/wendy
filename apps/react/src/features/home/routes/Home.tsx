import { Menu } from '@/services';
import { Link } from 'react-router-dom';

export const Home = () => {
  Menu.getPageList({ pageNumber: 1, pageSize: 10 });
  return (
    <div>
      <Link to={'/auth/login'}>Login</Link> <br />
    </div>
  );
};
