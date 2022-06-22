import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Avatar } from '@rneui/base';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import ChatListItem from './Components/ChatListItem';

import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../firebase/firebase';
const auth = getAuth(firebaseApp);

import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default function HomeScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  function getSnapshot(snapshot) {
    setChats(snapshot.docs.map(createDoc));
  }

  function createDoc(doc) {
    return {
      id: doc.id,
      data: doc.data(),
    };
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), getSnapshot);

    return unsubscribe;
  }, []);

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

  function createItem(chat) {
    const {
      id,
      data: { chatName },
    } = chat;
    // const id = chat.id;
    // const chatName = chat.data.chatName;

    return <ChatListItem key={id} id={id} chatName={chatName} />;
  }

  return (
    <SafeAreaView>
      <ScrollView>{chats.map(createItem)}</ScrollView>
    </SafeAreaView>
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
