import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input } from '@rneui/base';

export default function AddChatScreen({ navigation }) {
  const [chatName, setChatName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a New Chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  function createChat() {
    console.log('create chat');
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        onChangeText={setChatName}
        onSubmitEditing={createChat}
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
