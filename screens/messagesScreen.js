import React, { useState, useEffect, useContext } from 'react';
import {  View,
          StyleSheet,
          Text,
          FlatList,
          TextInput,
          TouchableOpacity,
          } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import SearchBar from '../components/searchBar';
import MessagePreview from '../components/messagePreview';
import Colors from '../constants/colors.js';
import Loading from './loadingScreen';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';
import { db } from '../firebase/config';

const MessagesScreen = (props) => {
  const { user } = useContext(AuthenticatedUserContext);

  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  const createChannel = () => {};

  const renderFeedItem = (item) => {
    return (
      <View style={{flex: 1}}>
        <MessagePreview item={item} navigation={props.navigation} setLoading={setLoading}/>
      </View>
    )
  };

  useEffect(() => {
    const fullData = [];
    db.collection('channels').get()
    .then(res => {
      res.forEach((doc) => {
        if (doc.data().members.includes(user.email)) {
          fullData.push(doc.data());
        }
      });
      setFullData(fullData);
      setData(fullData);
      setLoading(false);
    });
  },[loading]);

  if (loading) {
    return <Loading />;
  };

  return (
    <View style={styles.container}>
      { console.log(route.name) }
      <FlatList
        data={data}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent=<SearchBar
          loading={loading}
          setLoading={setLoading}
          routeName={route.name}
          navigation={props.navigation}
          fullData={fullData}
          setData={setData}/> />
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
