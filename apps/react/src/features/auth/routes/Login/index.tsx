import './index.less';

import Background from '@/components/Background';
import { useAuth } from '@/hooks/useAuth';
import { userStore } from '@/stores';
import { tokenStorage } from '@/utils/storages';
import { observer } from '@legendapp/state/react';
import LoginForm from '../../components/LoginForm';

const prefix = 'page-login';

const Login = () => {
  useAuth({ to: '/admin/home', options: { replace: true } }, [userStore.get()]);

  if (userStore.get() || tokenStorage.get()) {
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
