import React, { useState } from 'react';
import {  StyleSheet,
          View,
          Text,
          Image,
          TouchableOpacity ,
          TextInput
        } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import InputCard from './inputCard';

const TripGeneral = props => {
  const [tripTitle, setTripTitle] = useState([]);

  const updateInputData = (value) => {
    setTripTitle(value);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', position: 'absolute', left: 0, flexDirection: 'column' }}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={ require('../assets/images/feed_default.png') }
            resizeMode='stretch' />
            <Ionicons style={{ opacity: 0.4, position: 'relative', top: '-48%', alignSelf: 'center' }} name='image' size={100} color={Colors.white}/>
        </TouchableOpacity>

        <View style={[styles.verticalLine, {top: '-14%'}]}/>
      </View>

      <View style={{ top: '38%', }}>
        <InputCard setFormData={props.setFormData} title='Название похода' numberOfFields='1'/>
        <InputCard title='Дата походов' numberOfFields='1'/>
        <InputCard title={['Тип', 'Сложность', 'Разряд']} numberOfFields='3'/>
        <InputCard title='Описание похода' numberOfFields='1'/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '98%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  verticalLine: {
    flex: 1,
    marginLeft: 13,
    height: 190,
    width: 1,
    backgroundColor: Colors.secondary,
  },
});

export default TripGeneral;
