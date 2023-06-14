import './index.less';

import Background from '@/components/Background';
import { useAuth } from '@/hooks/useAuth';
import { authStore } from '@/stores/auth';
import { authStorage } from '@/utils/storages';
import { observer } from '@legendapp/state/react';
import LoginForm from '../../components/LoginForm';

const prefix = 'page-login';

const Login = () => {
  useAuth({ to: '/admin', options: { replace: true } }, [authStore.get()]);

  if (authStore.get() || authStorage.get()) {
    return null;
  }

  return (
    <div className={prefix}>
      <div className={`${prefix}-background`}>
        <Background />
      </div>

      <LoginForm prefix={prefix} />
    </div>
  );
};

export default observer(Login);
