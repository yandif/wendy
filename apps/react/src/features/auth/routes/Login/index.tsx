import './index.less';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/Background';
import { Account } from '@/services';
import { authStore } from '@/stores/auth';
import { authStorage } from '@/utils/storages';
import { notification } from 'antd';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const prefix = 'page-login';

  const nav = useNavigate();

  const getUserInfo = async () => {
    // 1.获取token
    const token = authStorage.get();
    if (token) {
      // 2.token存在,根据token获取用户信息。
      const res = await Account.getUserInfo();
      if (res.code === 0) {
        authStore.set(res.data);
      } else {
        authStorage.clear();
        notification.error({ message: res.message });
      }
    }
  };

  useEffect(() => {
    if (authStore.get()) {
      nav('/admin', { replace: true });
    } else {
      getUserInfo();
    }
  }, [authStore.get()]);

  return (
    <div className={prefix}>
      <div className={`${prefix}-background`}>
        <Background />
      </div>
      <LoginForm prefix={prefix} />
    </div>
  );
};

export default Login;
