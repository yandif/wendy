import { menuStore } from '@/stores';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

export const Bread = () => {
  const location = useLocation();
  const menus = menuStore.get();

  /** 根据当前路由动态生成对应的面包屑 **/
  const breads = useMemo(() => {
    const paths = location.pathname.replace(/^\/admin/, '');
    const breads = [];

    let parentId: any = null;
    do {
      const pathObj = menus.find(
        (v: { id: any; url: any }) => v.id === parentId || v.url === paths,
      );

      if (pathObj) {
        breads.push({
          title: pathObj.title,
        });
        parentId = pathObj.parent;
      } else {
        parentId = null;
      }
    } while (parentId);

    breads.reverse();
    return breads;
  }, [location.pathname, menus]);

  return (
    <div className="bread">
      <EnvironmentOutlined className="icon" />
      <Breadcrumb items={breads} />
    </div>
  );
};
