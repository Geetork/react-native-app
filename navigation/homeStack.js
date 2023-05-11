import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StartScreen from '../screens/startScreen';
import RegisterScreen from '../screens/registerScreen';
import { FeedScreen } from '../screens/feedScreen';
import TripDescriptionScreen from '../screens/tripDescriptionScreen';
import MyTripsScreen from '../screens/myTripsScreen';
import MessagesScreen from '../screens/messagesScreen';
import ProfileScreen from '../screens/profileScreen';
import ChatScreen from '../screens/chatScreen';
import NewTripScreen from '../screens/newTripScreen';

import Colors from '../constants/colors';

const FeedStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const FeedStackNavigator = () => {
  return (
    <FeedStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Ленту'}>
      <FeedStack.Screen name='Лента' component={FeedScreen}/>
      <FeedStack.Screen name='Подробнее' component={TripDescriptionScreen}/>
      <FeedStack.Screen name='Новый поход' component={NewTripScreen}/>
    </FeedStack.Navigator>
  )
};

const BottomTabNavigator = () => {
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
      })}
       initialRouteName={'Главная'}>
      <Tab.Screen name='Главная' component={FeedStackNavigator} />
      <Tab.Screen name='Мои походы' component={MyTripsScreen} />
      <Tab.Screen name='Сообщения' component={MessagesScreen} />
      <Tab.Screen name='Профиль' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Домашняя' component={BottomTabNavigator} />
      <HomeStack.Screen name='Чат' component={ChatScreen}/>
    </HomeStack.Navigator>)
};

export default HomeStackNavigator;
