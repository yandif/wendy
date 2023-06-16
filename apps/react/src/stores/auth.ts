import { observable } from '@legendapp/state';

export type User = {
  email?: string;
  id: number;
  isSuper: number;
  mobile?: number;
  role?: any[];
  token: string;
  username: string;
};

export const userStore = observable<User>();
