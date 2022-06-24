import { Avatar } from '@rneui/base';
import React, { useState, useLayoutEffect, useEffect } from 'react';

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

import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseApp from '../../firebase/firebase';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

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

  useEffect(() => {
    const messagesRef = collection(db, 'chats', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dbMessages = [];
      querySnapshot.forEach((doc) => {
        dbMessages.push({ id: doc.id, data: doc.data() });
      });
      setMessages(dbMessages);
    });
    return unsubscribe;
  }, [route]);

  function sendMessage() {
    if (!input) return;
    Keyboard.dismiss();

    try {
      const chatMessages = collection(db, 'chats', id, 'messages');
      addDoc(chatMessages, {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      });
    } catch (error) {
      alert(error.message);
    }

    setInput('');
  }

  function showMessage({ id, data }) {
    const isMe = data.displayName === auth.currentUser.displayName;
    const messageStyle = isMe ? styles.me : styles.other;
    const textStyle = isMe ? styles.meText : styles.otherText;
    const nameStyle = isMe ? styles.meName : styles.otherName;

    return (
      <View key={id} style={messageStyle}>
        <Avatar
          source={{ uri: data.photoURL }}
          rounded
          size={30}
          position="absolute"
          bottom={-15}
          right={-15}
          containerStyle={{
            position: 'absolute',
            bottom: -15,
            right: -5,
          }}
        />
        <Text style={textStyle}>{data.message}</Text>
        {isMe ? null : <Text style={nameStyle}>{data.displayName}</Text>}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(showMessage)}
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <TextInput
            placeholder="Chat message"
            style={styles.textInput}
            value={input}
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
