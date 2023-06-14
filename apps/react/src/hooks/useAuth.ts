import { CodeEnum } from '@/config';
import { Account } from '@/services';
import { authStore } from '@/stores/auth';
import { authStorage } from '@/utils/storages';
import { useEffect } from 'react';
import { NavigateOptions, Path, useNavigate } from 'react-router-dom';

export const useAuth = (
  props?: {
    to: string | Partial<Path>;
    options?: NavigateOptions;
  },
  deps?: React.DependencyList,
) => {
  const nav = useNavigate();

  const getUserInfo = async () => {
    const token = authStorage.get();
    if (token) {
      const res = await Account.getUserInfo();
      if (res.code === CodeEnum.SUCCESS) {
        authStore.set(res.data);
      }
    }
  };

  useEffect(() => {
    if (!authStore.get()) {
      getUserInfo();
    } else {
      if (props?.to) {
        nav(props.to, props.options);
      }
    }
  }, [deps]);
};
