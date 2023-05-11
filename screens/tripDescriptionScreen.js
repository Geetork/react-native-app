import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DUMMY_DATA } from './feedScreen';

import TripDescription from '../components/tripDescription';

const TripDescriptionScreen = ({navigation, route}) => {
  return (
    <TripDescription navigation={navigation} data={route.params?.item} />
  );
};

const styles = StyleSheet.create({

});

export default TripDescriptionScreen;
