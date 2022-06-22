import { StyleSheet, View, Pressable } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Avatar, Text } from '@rneui/base';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../firebase/firebase';
const auth = getAuth(firebaseApp);

export default function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat Home',
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',

      headerLeft: () => (
        <View>
          <Pressable onPress={logout}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </Pressable>
        </View>
      ),

      headerRight: () => (
        <View style={styles.headerRight}>
          <Pressable>
            <AntDesign name="camerao" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('AddChat')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

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
    </View>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20,
  },
});
