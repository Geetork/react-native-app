import React, { useState } from 'react';
import {  View,
          Text,
          StyleSheet,
          TouchableOpacity,
          Modal,
          Dimensions,
          TouchableWithoutFeedback,
        } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const EllipsisHorizontal = () => {
  const [isVisible, setIsVisible] = useState(false);
  let dimedBackground;

  const data = [
    {
      id: 1,
      icon: 'chatbox-outline',
      text: 'Написать организатору',
    },
    {
      id: 2,
      icon: 'link-outline',
      text: 'Скопировать ссылку',
    },
    {
      id: 3,
      icon: 'star-outline',
      text: 'Сохранить в закладках',
    },
  ];

  function displayModal(show) {
    setIsVisible(show);
  };

  const List = () => {
    return data.map((it) => {
      return (
        <View>
          <TouchableOpacity style={styles.button} key={it.id}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons style={{alignSelf: 'center', paddingLeft: 20,}} name={it.icon} size={26} color={Colors.navyBlue}/>
              <Text style={styles.text}>{it.text}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.line}/>
        </View>
      )
      })
  };

  return (
    <View>
      <Modal transparent={true} visible={isVisible}>
        <View style={styles.backgroundModal}>
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={1.0}
            onPressOut={() => {isVisible === true ? displayModal(false) : displayModal(false)}}>
          </TouchableOpacity>
        </View>

        <View style={styles.modal}>
          <List />
          <TouchableOpacity
            onPress={() => displayModal(false)}>
            <Text style={styles.cancel}>Отменить</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => displayModal(true)}>
        <Ionicons style={{ marginRight: 15}} name='ellipsis-horizontal' size={20} color='white' />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    height: 248,
    position: 'absolute',
    bottom: 45,
    width: Dimensions.get('window').width - 8,
    borderRadius: 25,
    backgroundColor: Colors.paleBlue,
  },
  backgroundModal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.heading,
    opacity: 0.2,
  },
  text: {
    fontSize: 18,
    paddingVertical: 20,
    paddingLeft: 20,
    color: Colors.navyBlue,
  },
  cancel: {
    fontSize: 18,
    paddingVertical: 20,
    color: Colors.navyBlue,
    alignSelf: 'center'
  },
  line: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: Colors.paleGray,
  },
});

export default EllipsisHorizontal;
