import { get } from '@/lib/axios';
import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
import { enableLegendStateReact } from '@legendapp/state/react';
import { Chance } from 'chance';

const chance = new Chance();

enableLegendStateReact();

function App() {
  console.log(chance.phone());
  get('account');
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
