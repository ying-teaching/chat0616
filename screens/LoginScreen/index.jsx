import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Image } from '@rneui/base';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import firebaseApp from '../../firebase/firebase';

const auth = getAuth(firebaseApp);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, [navigation]);

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
        }}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          hjk
          autoFocus
          type="email"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          onChangeText={setPassword}
          onSubmitEditing={login}
        />
      </View>
      <Button title="Login" containerStyle={styles.button} onPress={login} />
      <Button
        title="Register"
        containerStyle={styles.button}
        type="outline"
        onPress={() => navigation.navigate('Register')}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'cetner',
    padding: 10,
  },
  image: { width: 200, height: 200 },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
