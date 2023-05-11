import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { auth, db } from '../firebase/config';

import Loading from './loadingScreen';
import {AuthenticatedUserContext} from '../navigation/authenticatedUserProvider';

const ProfileScreen = props => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const personalDataIcons = {
    'city': 'home-outline',
    'rank': 'medal-outline',
  };

  const personalData = {
    'city': 'Город',
    'rank': 'Ранг/Категория',
  };

  useEffect(() => {
    db.collection('users').get()
    .then(users => {
      users.forEach(item => {
        if (item.data().email === user.email) {
          setData(Object.entries(item.data().personalData).map((value) => { return {[value[0]]: value[1]}} ));
        }
      });
      setLoading(false);
    })
  }, loading);

  const renderItem = (itemData) => {
    const key = Object.keys(itemData.item);
    const value = Object.values(itemData.item);
    return (

      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Ionicons name={personalDataIcons[key]} size={20} color={Colors.gray}/>
        <Text style={{ paddingLeft: 10, fontSize: 14, color: Colors.gray }}>{personalData[key]}: {value}</Text>
      </View>
    )
  };

  const signOut = () => {
    setLoading(true);
    auth.signOut();
    setLoading(false);
  };

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.profileId}>{user.email}</Text>
      </View>

      <View style={styles.body}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.avatar} source={require('../assets/images/avatar_default.png')}/>
          <View style={{ marginLeft: 10, marginTop: 10,}}>
            <Text style={styles.displayName}>{user.displayName}</Text>
            <Text style={styles.online}>в сети</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.editButton, { marginTop: 10, marginBottom: 15, }]}>
          <Text style={{ fontSize: 14, color: Colors.navyBlue, padding: 8, alignSelf: 'center' }}>Редактировать</Text>
        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: Colors.secondary, }}/>

        <FlatList
          style={{ marginBottom: 10, }}
          data={data}
          renderItem={renderItem}
          keyExtractor={itemData => itemData.id}
          showsVerticalScrollIndicator={false}/>

        <View style={{ height: 1, backgroundColor: Colors.secondary, }}/>

        <View style={{ marginTop: 20}}>
          <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='exit-outline' size={25} style={{color: Colors.navyBlue}}/>
            <Text style={{ color: Colors.navyBlue, paddingLeft: 5, }}>Выйти</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleBlue,
  },
  heading: {
    height: 90,
    backgroundColor: Colors.navyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 10,
    fontSize: 18,
    justifyContent: 'center',
  },
  body: {
    margin: 10,
  },
  profileId: {
    color: Colors.paleBlue,
    fontSize: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  displayName: {
    fontSize: 16,
  },
  online: {
    fontSize: 14,
    color: Colors.navyBlue,
  },
  editButton: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
  },
});

export default ProfileScreen;
