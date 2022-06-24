import React from 'react';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  kyeboardView: {
    flex: 1,
  },

  scrollView: {
    paddingTop: 15,
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
