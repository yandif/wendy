import { makeAutoObservable } from 'mobx';

type User = {
  name: string;
};

class AuthStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  login() {
    this.user = { name: '123' };
  }

  logout() {
    this.user = undefined;
  }
}

export const authStore = new AuthStore();
