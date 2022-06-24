import { Avatar } from '@rneui/base';
import React, { useState, useLayoutEffect } from 'react';

import { View, Text, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default function ChatScreen({ navigation, route }) {
  const { id, chatName } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar
            rounded
            source={{
              uri: 'https://www.gstatic.com/mobilesdk/180227_mobilesdk/database_rules_zerostate.png',
            }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <Pressable onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            width: 70,
            justifyContent: 'space-between',
            marginRight: 10,
          }}
        >
          <Pressable>
            <AntDesign name="videocamera" size={24} color="white" />
          </Pressable>
          <Pressable>
            <Ionicons name="call-outline" size={24} color="white" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>A list of all chat messages -- in time order</Text>
    </View>
  );
}
