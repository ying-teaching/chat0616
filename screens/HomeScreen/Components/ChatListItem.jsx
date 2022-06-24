import React from 'react';
import { StyleSheet } from 'react-native';

import { ListItem, Avatar } from '@rneui/base';

export default function ChatListItem({ id, chatName, enterChat }) {
  return (
    <ListItem onPress={() => enterChat(id, chatName)}>
      <Avatar
        source={{
          uri: 'https://www.gstatic.com/mobilesdk/180227_mobilesdk/database_rules_zerostate.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
          architecto voluptatem temporibus quo reprehenderit, recusandae dolorum
          fuga cumque quaerat ducimus debitis repellat maxime nemo possimus id
          amet quidem quasi esse!
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '800',
  },
});
