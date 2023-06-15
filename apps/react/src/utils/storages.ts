function createStorage(key: string) {
  const storage = {
    get: () => {
      return JSON.parse(window.localStorage.getItem(key) as string);
    },
    set: (token: any) => {
      window.localStorage.setItem(key, JSON.stringify(token));
    },
    clear: () => {
      window.localStorage.removeItem(key);
    },
  };

  return storage;
}

export const tokenStorage = createStorage('wendy_auth_token');
export const loginInfoStorage = createStorage('wendy_login_info');
