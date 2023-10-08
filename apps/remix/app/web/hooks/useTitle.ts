import { useEffect } from 'react';

import useAdminStore from '~/web/stores/admin';

export function useTitle(title: string) {
  const { setHeaderTitle } = useAdminStore();
  useEffect(() => {
    setHeaderTitle(title);
  }, []);
}
