import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

type NetworkStatus = {
  isOnline: boolean;
};

export const useNetworkStatus = (): NetworkStatus => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable));
    });

    return unsubscribe;
  }, []);

  return {isOnline};
};
