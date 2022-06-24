import React from 'react';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  keyboardView: {
    flex: 1,
  },

  me: {
    padding: 15,
    backgroundColor: '#ECEDEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },

  meText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  meName: {},

  other: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },

  otherText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  otherName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },

  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },

  textInput: {
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    borderRadius: 30,
    flex: 1,
    marginRight: 15,
    height: 40,
    padding: 10,
    color: '#4a412a',
    // bottom: 0,
  },
});

export default styles;
