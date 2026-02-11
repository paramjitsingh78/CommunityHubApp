import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

type LoaderProps = {
  fullscreen?: boolean;
};

export const Loader = ({fullscreen = false}: LoaderProps) => {
  return (
    <View style={fullscreen ? styles.fullscreen : styles.inline}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inline: {
    paddingVertical: 16,
  },
});
