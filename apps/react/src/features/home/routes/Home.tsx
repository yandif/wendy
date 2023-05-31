import { authStore } from '@/stores/auth';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          authStore.logout();
        }}>
        logout
      </button>
      <br />
      <Link to={'/auth/'}>Login</Link> <br />
      <Link to={'/antd/'}>antd</Link>
    </div>
  );
};
