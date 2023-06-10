import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
import { enableLegendStateReact } from '@legendapp/state/react';
import { authStore, login, logout } from './stores/auth';

enableLegendStateReact();

function App() {
  console.log(authStore);
  return (
    <>
      {authStore?.name} <button onClick={() => login('haha')}>login</button>
      <button
        onClick={() => {
          logout();
        }}>
        logout
      </button>
    </>
  );
  // return (
  //   <AppProvider>
  //     <AppRoutes />
  //   </AppProvider>
  // );
}

export default App;
