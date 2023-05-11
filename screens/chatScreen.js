import React, { useContext, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Loading from '../screens/loadingScreen';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';
import { auth, db } from '../firebase/config';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  let avatar = (auth?.currentUser?.photoURL) ? auth?.currentUser?.photoURL : require('../assets/images/avatar_default.png');

  useLayoutEffect(() => {
    console.log(route.params.channelId);
    db.collection('channels').doc(route.params.channelId).collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
        position: (auth?.currentUser?.id === doc.data().user.id) ? 'rigth' : 'left',
        }))
      ));
      setLoading(false);
  }, [loading]);

  function renderBubble(props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#d3d3d3',
              },
            }}
        />
    );
  };

  const onSend = useCallback((messages = []) => {
    console.log(user);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { createdAt, text, user } = messages[0];
    console.log(messages);
    db.collection('channels').doc(route.params.channelId).collection('messages').add({
      createdAt,
      text,
      user
    })
    .then(() => {
      db.collection('channels').doc(route.params.channelId).update({
        lastMessage: text,
      })
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={30} color={Colors.white}/>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'column'}}>
            <Text style={styles.chatName}>{route.params.chatName}</Text>
          </View>
        </View>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          textInputStyle={styles.textInputStyle}
          placeholder={''}
          onSend={(messages) => onSend(messages)}
          showAvatarForEveryMessage={false}
          user={{
            _id: auth?.currentUser?.email,
            avatar: avatar
          }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 90,
    backgroundColor: Colors.navyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 10,
  },
  chatName: {
    color: Colors.white,
    fontSize: 16,
    alignSelf: 'center',
    marginRight: 35,
  },
  textInputStyle: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingTop: 8,
    marginRight: 8,
  },
});

export default ChatScreen;
