import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Page from './Page';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}

export default App;
