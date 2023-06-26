import Progress from '@/components/Progress';
import { queryClient } from '@/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback="加载中">
      <ErrorBoundary
        FallbackComponent={() => (
          <button onClick={() => location.reload()}>Refresh</button>
        )}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
            <Progress />
            <Router>{children}</Router>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
