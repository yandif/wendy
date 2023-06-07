import { authStore } from '@/stores/auth';
import { Link } from 'react-router-dom';
import { Button } from '@kitten-ui/core';

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={() => {
          authStore.logout();
        }}>
        logout
      </Button>
      <br />
      <Link to={'/auth/'}>Login</Link> <br />
      <Link to={'/antd/'}>antd</Link>
    </div>
  );
};
