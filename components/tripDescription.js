import React from 'react';
import {  View,
          Text,
          StyleSheet,
          Button,
          TouchableOpacity,
          ImageBackground,
          Image,
          Dimensions,
        } from 'react-native';

import Colors from '../constants/colors.js';
import { Ionicons } from '@expo/vector-icons';
import BottomDrawer from 'rn-bottom-drawer';
import HorizontalLine from './horizontalLine';

const TripDescription = props => {
  const containerHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: Colors.secondary }}/>

      <BottomDrawer
        containerHeight={containerHeight}
        startUp={false}
        shadow={true}
        backgroundColor={Colors.paleBlue}
        downDisplay={containerHeight * 0.15}
        offset={0}>

        <View style={styles.card}>
          <HorizontalLine />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 30, paddingVertical: 20, alignItems: 'center' }}>
            <View>
              <Text style={styles.location}>{props.data.location}</Text>
              <Text style={styles.date}>26 марта - 15 апреля</Text>
            </View>
            <TouchableOpacity style={styles.button}><Text style={{ fontSize: 14, color: Colors.white }}>Участвовать</Text></TouchableOpacity>
          </View>

          <View style={{ height: 100, width: Dimensions.get('window').width - 60,}}>
            <Image style={styles.map}  source={require('../assets/images/map.png')}/>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 15, justifyContent: 'space-between'}}>
            <View style={styles.infoBox}>
              <View style={styles.box}><Text style={styles.info}>{props.data.duration}</Text></View>
              <Text style={styles.infoParams}>дня(-ей) в походе</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.box}><Text style={styles.info}>{props.data.category}</Text></View>
              <Text style={styles.infoParams}>разряд</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.box}><Text style={styles.info}>{props.data.length}</Text></View>
              <Text style={styles.infoParams}>км в пути</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.box}><Text style={styles.info}>{props.data.participants}</Text></View>
              <Text style={styles.infoParams}>участникa(-ов)</Text>
            </View>
          </View>

          <View>
            <Text style={{fontSize: 14}}>{props.data.description}</Text>
          </View>

          <View>
            <Text style={{fontSize: 16, paddingVertical: 15}}>Участники</Text>
            <Image source={require('../assets/images/participants.png')} />
          </View>
        </View>
      </BottomDrawer>
      <View style={{position: 'absolute', top: 43, left: 25}}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}>
          <Ionicons name='chevron-back-outline' size={30} color={Colors.navyBlue}/>
        </TouchableOpacity>
      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1
  },
  card: {
    flex: 5,
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  location: {
    fontSize: 22,
    paddingLeft: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.navyBlue,
    width: 140,
    height: 30,
    borderRadius: 15,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  box: {
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: Colors.navyBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 28,
    color:  Colors.white,
  },
  infoParams: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  date: {
    fontSize: 12,
    paddingLeft: 25,
    paddingTop: 10,
  },
});

export default TripDescription;
