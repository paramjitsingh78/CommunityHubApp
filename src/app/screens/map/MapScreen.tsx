import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppScreen} from '@app/components/layout/AppScreen';

export const MapScreen = () => {
  return (
    <AppScreen>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Discover communities around you</Text>

        {/* Later you could replace this with react-native-maps */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>
            We are working on this, it will be updated soon..
          </Text>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#676767',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: 'white',
  },
});
