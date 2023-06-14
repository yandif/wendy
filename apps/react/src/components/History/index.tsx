import { historyStore } from '@/stores/history';
import { ListenerFn } from '@legendapp/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const History = () => {
  const nav = useNavigate();
  const onChange: ListenerFn<string> = (value) => {
    nav(value.value);
  };

  useEffect(() => {
    return historyStore.onChange(onChange);
  });
  return <></>;
};
