//TODO: To persist across app restart

// import {QueryClient} from '@tanstack/react-query';
// import {persistQueryClient} from '@tanstack/react-query-persist-client';
// import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//     },
//   },
// });
// const persister = createAsyncStoragePersister({
//   storage: AsyncStorage,
// });

// persistQueryClient({
//   queryClient,
//   persister,
//   maxAge: 1000 * 60 * 60 * 24, // 24 hours
// });
