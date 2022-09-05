import React, { useState, useEffect } from 'react';
import {  View,
          StyleSheet,
          Text,
          FlatList,
          TextInput,
          TouchableOpacity,
          } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SearchBar from '../components/searchBar';
import MessagePreview from '../components/messagePreview';
import Colors from '../constants/colors.js';

const DUMMY_DATA = [
  {
    id: '1',
    name: 'Кавказ',
    lastMessage: '14',
  },
  {
    id: '2',
    name: 'Организатор',
    lastMessage: 'Добрый день! Спасибо за ваш отзыв о нашей экскурсии. Будем рады видеть Вас снова.',
  },
];

const MessagesScreen = (props) => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const renderFeedItem = (itemData) => {
    return (
      <View style={{flex: 1}}>
        <MessagePreview item={itemData.item} navigation={props.navigation}/>
      </View>
    )
  };

  useEffect(() => {
    setFullData(DUMMY_DATA);
    setData(DUMMY_DATA);
  },[]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderFeedItem}
        keyExtractor={itemData => itemData.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent=<SearchBar fullData={fullData} setData={setData}/> />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleBlue,
  },
});

export default MessagesScreen;
