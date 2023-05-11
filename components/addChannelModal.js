import React, { useState } from 'react';
import {  View,
          StyleSheet,
          Modal,
          TouchableOpacity,
          Dimensions,
          Text,
          TextInput,
          FlatList,
        } from 'react-native';

import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from './searchBar';
import { db } from '../firebase/config';
import CreateChannel from './createChannel';

const AddChannelModal = (props) => {
  const [query, setQuery] = useState('');
  const { modalVisible, setModalVisible, loading, setLoading } = props;
  const [data, setData] = useState([]);

  const renderFeedItem = (item) => {
    return (
      <View style={{flex: 1}}>
        <CreateChannel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          loading={loading}
          setLoading={setLoading}
          navigation={props.navigation}
          item={item}
          navigation={props.navigation}/>
      </View>
    )
  };

  function handleSearch(text) {
    const formattedQuery = text.toLowerCase();
    setQuery(text);
    const filteredData = [];

    db.collection('users').get()
    .then((res) => {
      res.forEach(doc => {
        console.log(doc.data());
        if (doc.data().email.includes(formattedQuery)) {
          filteredData.push({
            id: doc.data().email,
            type: 'DIRECT',
          });
        };
      });
      setData(filteredData);
    });
  };

  return (
    <View style={[styles.container, (modalVisible) ? {backgroundColor: Colors.heading, opacity: 0.2} : {opacity: 0.3}]}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10,}}>
            <Text style={{fontSize: 18, color: Colors.navyBlue, alignSelf: 'center', marginRight: Dimensions.get('window').width / 2 - 90}}>Новый чат</Text>
            <TouchableOpacity
              onPress={() => {setModalVisible(!modalVisible)}}>
              <Ionicons style={{}} name='close-circle-outline' size={35} color={Colors.navyBlue}/>
            </TouchableOpacity>
          </View>

          <View
            style={styles.searchBar}>
            <Ionicons style={{paddingLeft: 10}} name='search-outline' size={20} color={Colors.lightGray}/>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Искать'
              value={query}
              clearButtonMode='while-editing'
              style={styles.search}
              onChangeText={query => handleSearch(query)} />
          </View>

          <FlatList
            style={{marginTop: 20,}}
            data={data}
            renderItem={renderFeedItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -50,
    left: -6,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  modal: {
    backgroundColor: Colors.paleBlue,
    position: 'absolute',
    top: 40,
    left: 0,
    height: '100%',
    margin: 4,
    width: Dimensions.get('window').width - 8,
    borderRadius: 25,
    paddingTop: 20,
    paddingBottom: -50,
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
  searchBar: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.paleGray,
    height: 40,
  },
});

export default AddChannelModal;
