import './index.css';

import useFullScreen from '@/hooks/useFullScreen';
import { adminStore, userStore } from '@/stores';
import { tokenStorage } from '@/utils/storages';
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { observer } from '@legendapp/state/react';
import { Dropdown, Layout, Menu, Tooltip, notification } from 'antd';
import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AdminHeader: FC<any> = ({}) => {
  const [fullScreen, requestFullScreen, exitFullScreen] = useFullScreen();
  // 退出登录
  const handleLogout = useCallback(() => {
    notification.success({ message: '退出成功' });
    userStore.delete();
    tokenStorage.clear();
  }, []);
  const user = userStore.get();
  const collapsed = adminStore.collapsed.get();

  const FullScreen = () => (
    <Tooltip placement="bottom" title={fullScreen ? '退出全屏' : '全屏'}>
      <div
        className="full all_center"
        onClick={fullScreen ? exitFullScreen : requestFullScreen}>
        {fullScreen ? (
          <FullscreenExitOutlined className="icon" />
        ) : (
          <FullscreenOutlined className="icon" />
        )}
      </div>
    </Tooltip>
  );

  const Toggler = () => (
    <Tooltip placement="bottom" title={collapsed ? '展开菜单' : '收起菜单'}>
      <div
        className="trigger"
        onClick={() => adminStore.collapsed.set((v) => !v)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </Tooltip>
  );

  const UserInfo = () => (
    <Dropdown
      overlay={
        <Menu className="menu" selectedKeys={[]}>
          <Menu.Item key="logout" onClick={handleLogout}>
            <LogoutOutlined />
            退出登录
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight">
      <div className="userhead all_center">
        <SmileOutlined />
        <span className="username">{user?.username}</span>
      </div>
    </Dropdown>
  );

  const Login = () => (
    <Tooltip placement="bottom" title="点击登录">
      <div className="full all_center">
        <Link to="/admin/login">未登录</Link>
      </div>
    </Tooltip>
  );

  return (
    <Header className="admin-header">
      {!adminStore.hideSidebar.get() && <Toggler />}
      <div className="rightBox">
        <FullScreen />
        {user ? <UserInfo /> : <Login />}
      </div>
    </Header>
  );
};

export default observer(AdminHeader);
