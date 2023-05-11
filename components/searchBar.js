import React, { useState, useContext } from 'react';
import {  View,
          Text,
          StyleSheet,
          TextInput,
          TouchableOpacity,
        } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import filter from 'lodash.filter';

import { db } from '../firebase/config';

import Colors from '../constants/colors';
import AddChannelModal from '../components/addChannelModal';
import AddTripModal from '../components/addTripModal';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';

const SearchBar = (props) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { loading, setLoading } = props;

  function handleSearch(text) {
    const formattedQuery = text.toLowerCase();
    setQuery(text);
    const filteredData = filter(props.fullData, it => {
      return contains(it, formattedQuery);
    });
    props.setData(filteredData);
  };

  function contains(it, query) {
    for ( key in it ) {
      if (key === 'members') {
        let bool = false;
        it[key].forEach((member) => {
          if ((member != user.email) && member.includes(query)){
            console.log(member);
            bool = true}
        });
        return bool;
      } else if (it[key].toLowerCase().includes(query)) {
        return true;
      }
    };
    return false;
  };

  let lightGray = (modalVisible) ? Colors.gray : Colors.lightGray;
  let paleGray = (modalVisible) ? Colors.gray : Colors.paleGray;

  return (
      <View style={styles.header}>
      { (props.routeName === 'Сообщения') ?
          <AddChannelModal loading={loading} setLoading={setLoading} navigation={props.navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} /> : null
      }
        <View
          style={[styles.searchBar, {borderColor: Colors.lightGray}]}>
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

        <TouchableOpacity
          style={[styles.addFilter, {borderColor: Colors.lightGray}]}
          onPress={() => {
            setModalVisible(!modalVisible);
            if (props.routeName === 'Лента') props.navigation.navigate({name: 'Новый поход'})}}>
          <Ionicons name='add-outline' size={25} color={Colors.lightGray} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addFilter, {borderColor: Colors.lightGray}]}>
          <Ionicons name='options-outline' size={25} color={Colors.lightGray} />
        </TouchableOpacity>
      </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 6,
    paddingBottom: 20,
    paddingTop: 50,
  },
  addFilter: {
    borderWidth: 1.2,
    borderRadius: 12,
    padding: 5,
    marginLeft: 5,
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
    borderRadius: 12,
    borderWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default SearchBar;
