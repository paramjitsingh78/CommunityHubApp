import React, {useMemo, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {useAuthStore} from '@app/store/useAuthStore';
import {isValidEmail, isValidPassword} from '@app/utils/validators';
import {AppScreen} from '@app/components/layout/AppScreen';

export const LoginScreen = () => {
  const login = useAuthStore(state => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = useMemo(() => {
    return isValidEmail(email) && isValidPassword(password);
  }, [email, password]);

  return (
    <AppScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable
          disabled={!isFormValid}
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={() => login(email)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
