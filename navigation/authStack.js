import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StartScreen from '../screens/startScreen';
import RegisterScreen from '../screens/registerScreen';

import Colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Начало' component={StartScreen} />
      <Stack.Screen name='Регистрация' component={RegisterScreen} />
    </Stack.Navigator>
  )
};

export default AuthStackNavigator;
