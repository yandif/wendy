import { login } from '@/stores/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const nav = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          login('星晨');
          nav('/');
        }}>
        Login
      </button>
    </div>
  );
};
