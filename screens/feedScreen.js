import React, { useState, useEffect } from 'react';
import {  View,
          StyleSheet,
          Text,
          FlatList,
          TextInput,
          TouchableOpacity,
          } from 'react-native';
import filter from 'lodash.filter';
import { Ionicons } from '@expo/vector-icons';

import SearchBar from '../components/searchBar';
import TripPreview from '../components/tripPreview.js';
import Colors from '../constants/colors.js';

export const DUMMY_DATA = [
  {
    id: '1',
    organizer: 'Организатор',
    location: 'Кавказ',
    duration: '14',
    length: '15',
    category: '2',
    participants: '6',
    description: 'Отправляясь на Кавказ, каждый раз открываешь для себя что-то новое. Откройте для себя все красоты Северного Кавказа: канатки на вершины Эльбруса и Домбая, долина Нарзанов, панорманые ущелья, пышные застолья в горах и много другое!',
    picUrl: '../assets/images/feed_default.png',
    startDate: '26.03.22',
    endDate: '15.04.22',
  },
  {
    id: '2',
    organizer: 'Организатор',
    location: 'Байкал',
    duration: '7',
    length: '15',
    category: '2',
    participants: '6',
    picUrl: '../assets/images/feed_default.png',
    startDate: '26.03.22',
    endDate: '15.04.22',
  },
];

export const FeedScreen = props => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const renderFeedItem = (itemData) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TripPreview item={itemData.item} navigation={props.navigation}/>
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
  searchBar: {
    borderRadius: 12,
    borderColor: Colors.paleGray,
    borderWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    margin: 6,
  },
  filter: {
    borderWidth: 1.2,
    borderColor: Colors.paleGray,
    borderRadius: 12,
    padding: 5,
  },
  search: {
    paddingVertical: 8,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 14,
    color: Colors.gray,
    justifyContent: 'space-between',
    flex: 1,
  },
});
