import { authStore } from '@/stores/auth';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

export const Login = observer(() => {
  const nav = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          authStore.login('星晨');
          nav('/');
        }}>
        Login
      </button>
    </div>
  );
});
