import { observable } from '@legendapp/state';

export type User = {
  name: string;
};
// email
// :
// null
// id
// :
// 1
// isSuper
// :
// 1
// mobile
// :
// null
// platform
// :
// 0
// role
// :
// []
// token
// :
// "4d305adf997247a8869f03b35812d194"
// username
// :
// "admin"
export const authStore = observable<User>();

export const login = (name: string) => {
  authStore.set({ name });
};

export const logout = () => {
  authStore.delete();
};
