import { observable } from '@legendapp/state';

type User = {
  name: string;
};

export const authStore = observable<User>();

export const login = (name: string) => {
  authStore.set({ name });
};

export const logout = () => {
  authStore.delete();
};
