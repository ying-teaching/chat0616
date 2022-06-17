import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../firebase/firebase';
const auth = getAuth(firebaseApp);

export default function HomeScreen({ navigation }) {
  async function logout() {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View>
      <Text>Home Screen</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({});
