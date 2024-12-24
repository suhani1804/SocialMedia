import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useMutation, gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
    }
  }
`;

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useMutation(REGISTER_MUTATION);
  const { colors } = useTheme();

  const handleSignUp = async () => {
    try {
      await register({ variables: { username, email, password } });
      navigation.navigate('Main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Create Your Account</Text>
      <TextInput
        label="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        mode="outlined"
      />
      <TextInput
        label="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
      />
      <Button mode="contained" style={styles.button} onPress={handleSignUp}>
        Sign Up
      </Button>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 20,
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});

