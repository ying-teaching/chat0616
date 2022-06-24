import React from 'react';

import { View, Text } from 'react-native';

import styles from './styles';

export default function ChatScreen({ navigation, route }) {
  const { id, chatName } = route.params;

  return (
    <View>
      <Text>
        {id} {chatName}
      </Text>
    </View>
  );
}
