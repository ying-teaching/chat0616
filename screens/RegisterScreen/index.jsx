import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Text } from '@rneui/base';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login', // iOS only
    });
  }, [navigation]);

  function register() {
    console.log('register called');
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Chat Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autofocus
          type="text"
          onChangeText={setName}
        />
        <Input placeholder="Email" type="email" onChangeText={setEmail} />
        <Input
          placeholder="Passord"
          type="password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Input
          placeholder="Profile Pic UR"
          type="text"
          onChangeText={setImageUrl}
          onSubmitEditing={register}
        />
      </View>

      <Button
        style={styles.button}
        raised
        title={'Register'}
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: { width: 300 },
  button: { width: 200, marginTop: 10 },
});
