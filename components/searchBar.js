import React, { useState } from 'react';
import {  View,
          Text,
          StyleSheet,
          TextInput,
          TouchableOpacity,
        } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import filter from 'lodash.filter';

import Colors from '../constants/colors';

const SearchBar = (props) => {
  const [query, setQuery] = useState('');

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
      if (it[key].toLowerCase().includes(query)) {
        return true;
      }
    };
    return false;
  };

  return (
      <View style={styles.header}>
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
        <TouchableOpacity style={styles.filter}>
          <Ionicons name='options-outline' size={25} color={Colors.lightGray} />
        </TouchableOpacity>
      </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 50,
    margin: 6,
    paddingBottom: 20
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
  searchBar: {
    borderRadius: 12,
    borderColor: Colors.paleGray,
    borderWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
});

export default SearchBar;
