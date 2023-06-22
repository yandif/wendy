import { CodeEnum } from '@/constant';
import { Account } from '@/services';
import { userStore } from '@/stores/auth';
import { tokenStorage } from '@/utils/storages';
import { useEffect } from 'react';
import { NavigateOptions, Path, useNavigate } from 'react-router-dom';

type UseAuthInput = {
  to: string | Partial<Path>;
  options?: NavigateOptions;
};

export const useAuth = (props?: UseAuthInput, deps?: React.DependencyList) => {
  const nav = useNavigate();

  const getUserInfo = async () => {
    const token = tokenStorage.get();
    if (token) {
      const res = await Account.getUserInfo();
      if (res.code === CodeEnum.SUCCESS) {
        userStore.set(res.data);
      }
    }
  };

  useEffect(() => {
    if (!userStore.get()) {
      getUserInfo();
    } else {
      if (props?.to) {
        nav(props.to, props.options);
      }
    }
  }, [deps]);
};
