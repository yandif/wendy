import { Account } from '@/services';
import { authStore } from '@/stores/auth';
import { authStorage } from '@/utils/storages';

export const Home = () => {
  return (
    <div>
      <h1>admin</h1>
      <button
        onClick={async () => {
          Account.logout();
          authStorage.clear();
          authStore.delete();
        }}>
        logout
      </button>
    </div>
  );
};
