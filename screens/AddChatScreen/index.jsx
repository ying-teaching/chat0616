import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';

import { getFirestore, addDoc, collection } from 'firebase/firestore';
import firebaseApp from '../../firebase/firebase';
const db = getFirestore(firebaseApp);

export default function AddChatScreen({ navigation }) {
  const [chatName, setChatName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a New Chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  async function createChat() {
    try {
      await addDoc(collection(db, 'chats'), { chatName });
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        onChangeText={setChatName}
        onSubmitEditing={createChat}
        leftIcon={<AntDesign name="wechat" size={24} color="black" />}
      />
      <Button
        title="Create a New Chat"
        onPress={createChat}
        disabled={!chatName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    height: '100%',
  },
});
