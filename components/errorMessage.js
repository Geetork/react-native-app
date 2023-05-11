import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Colors from '../constants/colors';

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error,
    fontSize: 14,
    flex: 1,
    justifyContent: 'flex-start',
  }
});

export default ErrorMessage;
