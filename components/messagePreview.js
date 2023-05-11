import React, { useContext } from 'react';
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
import { db } from '../firebase/config';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';
import { Ionicons } from '@expo/vector-icons';

const MessagePreview = (props) => {
  const { user } = useContext(AuthenticatedUserContext);

  const chatName = () => {
    let name;
    if (props.item.item.type === 'DIRECT') {
      props.item.item.members.forEach((member) => {
        if (member != user.email) name = member;
      })
    } else {
      name = props.item.item.chatName;
    }
    return name;
  };

  const deleteChannel = () => {
    db.collection('channels').doc(props.item.item.id).delete()
    .then(() => {
      props.setLoading(true);
      console.log('Chat has been deleted!')});
  };

  const renderRightAction = (progress, dragAnimatedValue) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rightAction} onPress={() => deleteChannel()}>
        <Animated.Text
          style={[
            styles.action,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          <Ionicons name='trash-outline' size={25} />
        </Animated.Text>
      </RectButton>
    );
  };

  function handleJoinChannel() {
    console.log(props.item.item);
    props.navigation.navigate({
      name: 'Чат',
      params: {
        channelId: props.item.item.id,
        chatName: chatName(),
      }});
  };

  return (
    <View style={{flex: 1, borderWidth: 0.5, borderColor: Colors.paleGray, marginBottom: -0.6,}}>
      <Swipeable renderRightActions={renderRightAction}>
        <TouchableOpacity
          style={styles.preview}
          onPress={() => {handleJoinChannel()}}>
          <View>
            <Image style={styles.avatar} source={require('../assets/images/avatar_default.png')}/>
          </View>
          <View style={styles.text}>
            <Text numberOfLines={1} ellipsizeZone='middle'>{chatName()}
            </Text>
            <Text numberOfLines={2} ellipsizeZone='middle' style={styles.lastMessage}>
              {props.item.item.lastMessage}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
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
  rightAction: {

  },
  action: {
    flex: 1,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: Colors.error,
  },
});

export default MessagePreview;
