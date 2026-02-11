import {useNetworkStatus} from '@app/hooks/useNetworkStatus';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OfflineBanner} from '../ui/OfflineBanner';

type Props = {
  children: React.ReactNode;
};

export const AppScreen = ({children}: Props) => {
  const {isOnline} = useNetworkStatus();

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      {!isOnline && <OfflineBanner />}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
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
