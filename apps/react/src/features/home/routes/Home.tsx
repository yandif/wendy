import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Link to={'/auth/login'}>Login</Link> <br />
    </div>
  );
};
