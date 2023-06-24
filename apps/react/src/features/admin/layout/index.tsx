import { adminStore } from '@/stores';
import { observer } from '@legendapp/state/react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Bread } from './Bread';
import Footer from './Footer';
import Header from './Header';
import Sider from './Sider';

const AdminLayout = ({ baseName = '' }) => {
  const { hideFooter, hideHeader, hideSidebar, hideBread } = adminStore.get();

  const headerHeight = 64;
  const breadHeight = 54;
  const footerHeight = 48;
  const scrollHeight = hideHeader ? 0 : headerHeight;
  const contentTop = hideBread ? 16 : 0;
  const contentBottom = hideFooter ? 16 : 0;
  let contentHeight = contentBottom + contentTop;
  !hideHeader && (contentHeight += headerHeight);
  !hideBread && (contentHeight += breadHeight);
  !hideFooter && (contentHeight += footerHeight);

  return (
    <>
      <Layout>
        {!hideSidebar && <Sider key="admin-sider" baseName={baseName} />}
        <Layout>
          {!hideHeader && <Header key="admin-header" />}
          <div
            style={{
              height: `calc(100vh - ${scrollHeight}px)`,
              overflowY: 'auto',
            }}>
            {!hideBread && <Bread key="admin-bread" />}
            <Layout.Content
              key="admin-content"
              style={{
                margin: '0 16px',
                marginTop: contentTop,
                marginBottom: contentBottom,
                padding: 16,
                minHeight: `calc(100vh - ${contentHeight}px)`,
                backgroundColor: '#fff',
              }}>
              <Outlet />
            </Layout.Content>
            {!hideFooter && <Footer key="admin-footer" />}
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default observer(AdminLayout);
