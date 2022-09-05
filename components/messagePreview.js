import React from 'react';
import {  View,
          Text,
          StyleSheet,
          Image,
          Dimensions,
        TouchableOpacity,
       } from 'react-native';
import Colors from '../constants/colors';

const MessagePreview = (props) => {
  return (
    <View style={{flex: 1, borderWidth: 0.5, borderColor: Colors.paleGray, marginBottom: -0.6,}}>
      <TouchableOpacity style={styles.preview}>
        <View>
          <Image style={styles.avatar} source={require('../assets/images/avatar_default.png')}/>
        </View>
        <View style={styles.text}>
          <Text>{props.item.name}</Text>
          <Text numberOfLines={2} ellipsizeZone='middle' style={styles.lastMessage}>
            {props.item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  preview: {
    flexDirection: 'row',
    justifyContent: 'flex-around',
    flex: 1,
    padding: 10,
  },
  text: {
    paddingLeft: 10,
    paddingRight: 120,
    fontSize: 13,
  },
  lastMessage: {
    paddingTop: 5,
    color: Colors.gray,
    fontSize: 12,
    marginRight: 20,
  },
});

export default MessagePreview;
