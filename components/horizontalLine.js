import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const HorizontalLine = () => {
  return (
    <View style={{
      heigth: 5,
      width: 60,
      borderRadius: 5,
      borderWidth: 3,
      alignSelf: 'center',
      marginTop: 10,
      borderColor: Colors.secondary,
    }} />
  );
};

export default HorizontalLine;
