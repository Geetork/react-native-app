import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Header from '../components/header';
import TripGeneral from '../components/tripGeneral';

const NewTripScreen = props => {
  const [formData, setFormData] = useState('jkjkjk');
  const data = [{ activated: true, name: 'Основное' },
    {activated: false, name: 'Роли' },
    {activated: false, name: 'Снаряжение' }];
  const [marker, setMarker] = useState(data);

  const isActive = (item) => {
    const newData = marker.map(it => {
      console.log(it);
      if (it === item) {
          return {
            activated: true,
            name: it.name
          }}
      else
        return {
          activated: false,
          name: it.name
        };
    });
    setMarker(newData);
  };

  return (
    <View style={styles.container}>
      <Header color={Colors.white} fontColor={Colors.navyBlue} heading={'Создание похода'} navigation={props.navigation} formData={formData}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.white }}>
        {
          marker.map(item => (
            <View>
              <TouchableOpacity
                onPress={() => {isActive(item)}}
                style={{ alignItems: 'center' }}>
                <Text style={{ color: item.activated === true ? Colors.navyBlue : Colors.gray }}>{item.name}</Text>
                <Ionicons style={{ paddingVertical: 5 }} name='ellipse' size={6} color={item.activated === true ? Colors.navyBlue : Colors.white }/>
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
      <View style={{ flex: 1, }}>
        {
          marker.map(item => {
            if (item.activated === true) {
              switch (item.name) {
                case 'Основное': return <TripGeneral setFormData={setFormData}/>;
              }
            }
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {

  },
});

export default NewTripScreen;
