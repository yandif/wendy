import { User, historyStore, userStore } from '@/stores';
import { ListenerFn } from '@legendapp/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useListener() {
  const nav = useNavigate();

  const handleHistoryChange: ListenerFn<string> = (params) => {
    nav(params.value);
  };

  useEffect(() => {
    return historyStore.onChange(handleHistoryChange);
  }, []);

  const handleAuthChange: ListenerFn<User> = (params) =>
    !params.value && nav('/auth/login');

  useEffect(() => {
    return userStore.onChange(handleAuthChange);
  });
}
