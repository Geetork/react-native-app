import React, { useContext, useState } from 'react';
import {  View,
          Text,
          StyleSheet,
          Image,
          Dimensions,
          TouchableOpacity,
          Animated,
       } from 'react-native';
import Colors from '../constants/colors';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../firebase/config';

const CreateChannel = (props) => {
  const { user } = useContext(AuthenticatedUserContext);
  const { modalVisible, setModalVisible, loading, setLoading } = props;

  function handleJoinChannel(channel) {
    console.log(channel);
    props.navigation.navigate({
      name: 'Чат',
      params: {
        channelId: channel.id,
        chatName: chatName(channel),
      }});
    setModalVisible(!modalVisible);
  };

  const chatName = (channel) => {
    let name;
    if (channel.type === 'DIRECT') {
      channel.members.forEach((member) => {
        if (member != user.email) name = member;
      })
    }
    return name;
  };

  const handleCreateChannel = () => {
    db.collection('channels')
    .where('members', 'array-contains', props.item.item.id)
    .get()
    .then(docs => {
      const channel = [];
      docs.forEach(doc => {
        if (doc.data().members.includes(user.email)) {
          channel.push(doc.data());
        }
      });

      if (channel.length != 0) {
        handleJoinChannel(channel[0]);
      } else {
        const members = [props.item.item.id, user.email];
        const lastMessage = '';
        const type = 'DIRECT';
        db.collection('channels').add({
          lastMessage,
          members,
          type
        })
        .then(doc => {
          db.collection('channels').doc(doc.id).update({id: doc.id})
          .then(() => {
            db.collection('channels').doc(doc.id).get()
            .then((channel) => {
              setLoading(true);
              handleJoinChannel(channel.data());
            })
          });
        });
      };
    });
  };

  return (
    <View style={{flex: 1, borderWidth: 0.5, borderColor: Colors.paleGray, marginBottom: -0.6,}}>
      <TouchableOpacity
        style={styles.preview}
        onPress={() => handleCreateChannel()}>
        <View>
          <Image style={styles.avatar} source={require('../assets/images/avatar_default.png')}/>
        </View>
        <View style={styles.text}>
          <Text numberOfLines={1} ellipsizeZone='middle'>{props.item.item.id}</Text>
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
});

export default CreateChannel;
