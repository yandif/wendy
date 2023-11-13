import { useEffect } from 'react';

import useAdminStore from '~/web/stores/admin';

export default function Setting() {
  const { setHeaderTitle } = useAdminStore();
  useEffect(() => {
    setHeaderTitle('系统设置');
  }, []);
  return <div>系统设置</div>;
}
