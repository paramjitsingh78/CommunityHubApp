import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import {useAuthStore} from '@app/store/useAuthStore';
import {StyleSheet, View} from 'react-native';
import {Loader} from '@app/components/ui/Loader';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const {token, isHydrated} = useAuthStore();
  console.log('token===> ', token);

  if (!isHydrated) {
    return (
      <View style={styles.loader}>
        <Loader />
      </View>
    );
  }

  return (
    <Stack.Navigator
      key={token ? 'app' : 'auth'}
      screenOptions={{headerShown: false}}>
      {token ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
