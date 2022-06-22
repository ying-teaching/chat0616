import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function AddChatScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a New Chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  return (
    <View>
      <Text>Add Chat Room</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
