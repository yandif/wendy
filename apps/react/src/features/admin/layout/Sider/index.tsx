import ImgLogo from '@/assets/img/logo.png';
import Icon from '@/components/Icon';
import { adminStore, menuStore } from '@/stores';
import { flatToTree } from '@/utils/tool';
import { observer } from '@legendapp/state/react';
import { Layout, Menu, MenuProps } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.less';

type MenuItem = Required<MenuProps>['items'][number];

const Sider = ({ baseName }: { baseName: string }) => {
  const location = useLocation();
  const nav = useNavigate();

  const [selected, setSelected] = useState<Array<string>>();
  const [openKeys, setOpenKeys] = useState<Array<string>>();
  const collapsed = adminStore.collapsed.get();

  useEffect(() => {
    setSelected([location.pathname.replace(baseName, '')]);

    if (!collapsed) {
      const paths = location.pathname.split('/').filter((item) => !!item);
      setOpenKeys([...paths.map((item) => `/${item}`)]);
    }
  }, [collapsed, location]);

  const data = menuStore.get();

  const items = useMemo(() => {
    const d = cloneDeep(data);
    d.sort((a, b) => a.sorts - b.sorts);
    const sourceData = flatToTree(d) || [];
    const getItems = (data: typeof sourceData): MenuItem[] => {
      return data.map((item) => {
        if (item.children) {
          return {
            key: item.url,
            icon: !item.parent && item.icon ? <Icon type={item.icon} /> : null,
            children: getItems(item.children),
            label: item.title,
          } as MenuItem;
        } else {
          return {
            key: item.url,
            icon: !item.parent && item.icon ? <Icon type={item.icon} /> : null,
            label: item.title,
          } as MenuItem;
        }
      });
    };

    return getItems(sourceData);
  }, [data]);

  return (
    <Layout.Sider
      width={256}
      className="admin-sider"
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div className={collapsed ? 'menuLogo hide' : 'menuLogo'}>
        <Link to="/admin/home">
          <img src={ImgLogo} />
          <div>React-Admin</div>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selected}
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
        onSelect={(e) => nav(baseName + e.key)}
        items={items}
      />
    </Layout.Sider>
  );
};
export default observer(Sider);
