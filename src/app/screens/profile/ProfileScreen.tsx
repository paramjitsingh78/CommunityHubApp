import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {AppScreen} from '@app/components/layout/AppScreen';
import {useAuthStore} from '@app/store/useAuthStore';

export const ProfileScreen = () => {
  const {logout, userEmail} = useAuthStore();

  return (
    <AppScreen>
      <View style={styles.container}>
        <Text style={styles.label}>Email Account</Text>
        <Text style={styles.value}>{userEmail ?? 'user@example.com'}</Text>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
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
    marginBottom: 24,
  },
  label: {
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: 'black',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#7a9af9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
