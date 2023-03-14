import { create } from 'zustand';

type User = {
  id: number;
  username: string;
  isSuper: number;
};

type AdminState = {
  sizeName: string;
  headerTitle: string;
  user: User | null;
  menus: unknown[];
  setUser: (v: User) => void;
  setHeaderTitle: (v: string) => void;
  setSizeName: (v: string) => void;
  setMenus: (v: unknown[]) => void;
};

const useAdminStore = create<AdminState>((set) => ({
  sizeName: '',
  headerTitle: '',
  user: null,
  menus: [],
  setUser: (user) => set(() => ({ user })),
  setHeaderTitle: (headerTitle) => set(() => ({ headerTitle })),
  setSizeName: (sizeName) => set(() => ({ sizeName })),
  setMenus: (menus) => set(() => ({ menus })),
}));

export default useAdminStore;
