import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StartScreen from './screens/startScreen';
import RegisterScreen from './screens/registerScreen';
import { FeedScreen } from './screens/feedScreen';
import TripDescriptionScreen from './screens/tripDescriptionScreen';
import MyTripsScreen from './screens/myTripsScreen';
import MessagesScreen from './screens/messagesScreen';
import ProfileScreen from './screens/profileScreen';

import Colors from './constants/colors';

const FeedStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStackNavigator = () => {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name='Лента' component={FeedScreen}/>
      <FeedStack.Screen name='Подробнее' component={TripDescriptionScreen}/>
    </FeedStack.Navigator>
  )
};

const StartStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Начало' component={StartScreen} />
      <Stack.Screen name='Регистрация' component={RegisterScreen} />
      <Stack.Screen name='Лента' component={BottomTabs} />
    </Stack.Navigator>
  )
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          const icons = {
            'Главная': ( focused ? 'home' : 'home-outline' ),
            'Мои походы': ( focused ? 'heart' : 'heart-outline'),
            'Сообщения': ( focused ? 'chatbox' : 'chatbox-outline'),
            'Профиль': ( focused ? 'person' : 'person-outline'),
          };

          return (
            <Ionicons style={{ marginTop: 5 }} name={icons[route.name]} color={color} size={25} />
          );
        },
        tabBarActiveTintColor: Colors.navyBlue,
        tabBarInactiveTintColor: Colors.navyBlue,
      })}>
      <Tab.Screen name='Главная' component={FeedStackNavigator} />
      <Tab.Screen name='Мои походы' component={MyTripsScreen} />
      <Tab.Screen name='Сообщения' component={MessagesScreen} />
      <Tab.Screen name='Профиль' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {

  return (
    <NavigationContainer>
      <StartStackNavigator />
    </NavigationContainer>
  );
}
