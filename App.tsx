import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'react-native';
import {RootNavigator} from '@app/navigation';
import {useAuthStore} from '@app/store/useAuthStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
    },
  },
});

const App = () => {
  const hydrate = useAuthStore(state => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        {/* RootNavigator will be mounted here */}
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
