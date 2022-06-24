import { Avatar } from '@rneui/base';
import React, { useState, useLayoutEffect } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function ChatScreen({ navigation, route }) {
  const { id, chatName } = route.params;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

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

  function sendMessage() {
    console.log('send msg: ' + input);
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
          <ScrollView>
            <Text>Display an ordered list of messages.</Text>
          </ScrollView>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <TextInput
            placeholder="Chat message"
            style={styles.textInput}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          />
          <Pressable onPress={sendMessage}>
            <FontAwesome name="send" size={24} color="blue" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
