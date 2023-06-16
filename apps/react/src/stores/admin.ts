import { observable } from '@legendapp/state';
import { persistObservable } from '@legendapp/state/persist';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';

export type AdminConfig = {
  hideFooter: boolean;
  hideHeader: boolean;
  hideSidebar: boolean;
  hideBread: boolean;
  collapsed: boolean;
};

export const adminStore = observable<AdminConfig>({
  hideFooter: false,
  hideHeader: false,
  hideSidebar: false,
  hideBread: false,
  collapsed: false,
});

persistObservable(adminStore, {
  local: 'adminStore',
  persistLocal: ObservablePersistLocalStorage,
});
