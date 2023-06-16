import { observable } from '@legendapp/state';

export type MenuData = {
  id: number;
  title: string;
  icon: string;
  url: string;
  parent?: number;
  desc: string;
  sorts: number;
  conditions: number;
};

export const menuStore = observable<MenuData[]>([
  {
    id: 1,
    title: '首页',
    icon: 'icon-home',
    url: '/home',
    parent: undefined,
    desc: '首页',
    sorts: 0,
    conditions: 1,
  },
  {
    id: 2,
    title: '系统管理',
    icon: 'icon-setting',
    url: '/system',
    parent: undefined,
    desc: '系统管理目录分支',
    sorts: 1,
    conditions: 1,
  },
  {
    id: 3,
    title: '用户管理',
    icon: 'icon-user',
    url: '/system/account',
    parent: 2,
    desc: '系统管理/用户管理',
    sorts: 0,
    conditions: 1,
  },
  {
    id: 4,
    title: '角色管理',
    icon: 'icon-team',
    url: '/system/role',
    parent: 2,
    desc: '系统管理/角色管理',
    sorts: 1,
    conditions: 1,
  },
  {
    id: 5,
    title: '权限管理',
    icon: 'icon-safetycertificate',
    url: '/system/power',
    parent: 2,
    desc: '系统管理/权限管理',
    sorts: 2,
    conditions: 1,
  },
  {
    id: 6,
    title: '菜单管理',
    icon: 'icon-appstore',
    url: '/system/menu',
    parent: 2,
    desc: '系统管理/菜单管理',
    sorts: 3,
    conditions: 1,
  },
]);
