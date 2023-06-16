import { Head } from '@/components/Head';
import { adminStore } from '@/stores/admin';
import { Button } from 'antd';

export const Home = () => {
  return (
    <div>
      <Head title="首页" />
      <h1>Home</h1>
      <Button onClick={() => adminStore.hideFooter.set((v) => !v)}>
        hideFooter
      </Button>
      <Button onClick={() => adminStore.hideHeader.set((v) => !v)}>
        hideHeader
      </Button>
      <Button onClick={() => adminStore.hideBread.set((v) => !v)}>
        hideBread
      </Button>
      <Button onClick={() => adminStore.hideSidebar.set((v) => !v)}>
        hideSidebar
      </Button>
    </div>
  );
};
