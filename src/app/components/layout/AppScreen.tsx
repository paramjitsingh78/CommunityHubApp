import {useNetworkStatus} from '@app/hooks/useNetworkStatus';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OfflineBanner} from '../ui/OfflineBanner';

type Props = {
  children: React.ReactNode;
};

export const AppScreen = ({children}: Props) => {
  const {isOnline} = useNetworkStatus();

  return (
    <View style={styles.safe}>
      {!isOnline && <OfflineBanner />}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});
