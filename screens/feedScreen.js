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
import Loading from '../screens/loadingScreen';

import { db } from '../firebase/config';

export const FeedScreen = props => {
  const [ data, setData ] = useState([]);
  const [ fullData, setFullData ] = useState([]);
  const [ loading, setLoading ] = useState([true]);

  const renderFeedItem = (itemData) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TripPreview item={itemData.item} navigation={props.navigation} route={props.route}/>
      </View>
    )
  };

  useEffect(() => {
    db.collection('trips').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        organiser: doc.data().organiser,
        location: doc.data().location,
        duration: doc.data().duration,
        length: doc.data().length,
        category: doc.data().category || '-',
        participants: doc.data().participants,
        picUrl: '../assets/images/feed_default.png',
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate(),
        description: doc.data().description,
      }));
      setFullData(data);
      setData(data);
      setLoading(false);
    })
  }, [ loading ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderFeedItem}
        keyExtractor={itemData => itemData.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent=<SearchBar fullData={fullData} setData={setData} routeName={props.route.name} navigation={props.navigation}/> />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleBlue,
  },
});
