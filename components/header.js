import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';
import { db } from '../firebase/config';

const Header = props => {
  const { user } = useContext(AuthenticatedUserContext);
  const [isDisabled, setIsDisabled] = useState([]);

  function createTrip() {
    props.navigation.goBack();
  }

  return (
    <View style={[styles, {backgroundColor: props.color}]}>
      <View style={{flexDirection: 'row', alignItems: 'center', height: 90, paddingTop: 45, padding: 10, }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}>
          <Ionicons name='chevron-back-outline' size={30} color={props.fontColor}/>
        </TouchableOpacity>
        <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', }}>
          <Text style={{fontSize: 17, color: props.fontColor }}>{props.heading}</Text>
        </View>
        <TouchableOpacity
          disabled={() => setIsDisabled(props.formData ? false : true)}
          onPress={() => createTrip()}>
          <Ionicons name='checkmark-circle-outline' size={35} color={isDisabled ? Colors.lightGray : Colors.mediumSeaGreen}/>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Header;
