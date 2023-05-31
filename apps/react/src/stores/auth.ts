import { makeAutoObservable } from 'mobx';

type User = {
  name: string;
};

class AuthStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  login(name: string) {
    this.user = { name };
  }

  logout() {
    this.user = undefined;
  }
}

export const authStore = new AuthStore();
