import React from 'react';
import {  View,
          StyleSheet,
          Text,
          Image,
          TouchableOpacity,
          Dimensions,
        } from 'react-native';

import Colors from '../constants/colors.js';
import { Ionicons } from '@expo/vector-icons';

import EllipsisHorizontal from './ellipsisHorizontal';

const TripPreview = (props) => {

  return (
    <View style={styles.card}>
      <View style={{ flex: 1, flexDirection: 'column'}}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.avatar} source={require('../assets/images/avatar_default.png')}/>
            <Text style={styles.organizer}>{props.item.organiser}</Text>
          </View>
          <EllipsisHorizontal trip={props.item} route={props.route}/>
        </View>

        <View>
          <Image
            style={styles.image}
            source={ require('../assets/images/feed_default.png') }
            resizeMode='stretch' />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15}}>
          <Text style={styles.location}>{props.item.location}</Text>
          <View style={{ flex: 3, flexDirection: 'row'}}>
            <View style={styles.info}>
              <Text style={styles.infoText}>{props.item.duration}</Text>
              <Text style={styles.infoParams}>дней</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{props.item.length}</Text>
              <Text style={styles.infoParams}>км</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{props.item.category}</Text>
              <Text style={styles.infoParams}>разряд</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{props.item.participants}</Text>
              <Text style={styles.infoParams}>участников</Text>
            </View>
          </View>
        </View>

        <View style={styles.description}>
          <Text style={{color: Colors.navyBlue}} numberOfLines={2} ellipsizeZone='middle'>
            {props.item.description}
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {props.navigation.navigate({
              name: 'Подробнее',
              params: { item: props.item } })}}>
            <Text style={styles.buttonText}>Подробнее</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - 8,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    marginBottom: 10,
  },
  organizer: {
    color: Colors.heading,
    fontSize: 14,
    marginLeft: 12,
  },
  location: {
    color: Colors.navyBlue,
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
    marginTop: 5,
    paddingLeft: 15,
  },
  image: {
    width: '100%',
  },
  button: {
    alignSelf: 'flex-end',
    width: 120,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: Colors.navyBlue,
    paddingVertical: 6,
  },
  buttonText: {
    marginTop: 1,
    fontSize: 14,
    color: Colors.white,
    marginBottom: 3,
    textAlign: 'center',
  },
  info: {
    marginLeft: 15,
    marginRight: 15,
  },
  infoText: {
    color: Colors.navyBlue,
    fontSize: 18,
    textAlign: 'center',
  },
  infoParams: {
    color: Colors.navyBlue,
    fontSize: 12,
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 20,
    height: 40,
    width: 40,
    marginLeft: 15
  },
  description: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 14,
  },
});

export default TripPreview;
