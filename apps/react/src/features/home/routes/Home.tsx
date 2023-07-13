import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Link to={'/demo/'}>demo</Link> <br />
      <Link to={'/auth/login'}>Login</Link> <br />
    </div>
  );
};
