import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const OfflineBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
