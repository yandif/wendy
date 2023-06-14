import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
import { enableLegendStateReact } from '@legendapp/state/react';

enableLegendStateReact();

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
