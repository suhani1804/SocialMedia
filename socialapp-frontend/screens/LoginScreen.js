import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      setError('');
      const { data } = await login({ variables: { email, password } });
      await AsyncStorage.setItem('token', data.login);
      navigation.replace('Main');
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };


  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={styles.button}>
        Login
      </Button>
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginVertical: 20 },
  link: { textAlign: 'center', color: 'blue' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
