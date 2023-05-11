import React, { useState, useContext, useEffect } from 'react';
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

import { db } from '../firebase/config';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';

const EllipsisHorizontal = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useContext(AuthenticatedUserContext);

  let dimedBackground;

  function displayModal(show) {
    console.log(props.route.name);
    setIsVisible(show);
  };

  const List = (tripID) => {
    const [data, setData] = useState([
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
    ]);

    return data.map((it) => {
      function saveToFavorites(it) {
        db.collection('users').where('email', '==', user.email).get()
          .then(snapshot => {
            const userID = snapshot.docs[0].id;

            if (it.text === 'Сохранить в закладках') {
              db.collection('users').doc(userID).collection('favorites').where('tripID', '==', props.trip.id).get()
              .then(snapshot => {
                const doc = snapshot.docs[0];
                console.log(doc);
                if (!doc) {
                  db.collection('users').doc(userID).collection('favorites').add({
                    tripID: props.trip.id,
                    organiser: props.trip.organiser,
                    location: props.trip.location,
                    duration: props.trip.duration,
                    length: props.trip.length,
                    category: props.trip.category,
                    participants: props.trip.participants,
                    picUrl: '../assets/images/feed_default.png',
                    startDate: props.trip.startDate,
                    endDate: props.trip.endDate,
                    description: props.trip.description,
                  });
                };
                const newData = data.map(item => {
                  if (item.id === 3) {
                    return {
                      id: 3,
                      icon: 'star',
                      text: 'Сохранено в закладках'
                    }
                  } else { return item; }
                });
                setData(newData);
              });
            } else if (it.text === 'Сохранено в закладках') {
              db.collection('users').doc(userID).collection('favorites').where('tripID', '==', props.trip.id).get()
              .then(snapshot => {
                console.log(snapshot.docs[0].data());
                snapshot.docs[0].ref.delete();
                const newData = data.map(item => {
                  if (item.id === 3)
                    return {
                      id: 3,
                      icon: 'star-outline',
                      text: 'Сохранить в закладках'
                    };
                  else return item;
                });
                setData(newData);
              });
            }
          });
      };

      useEffect(() => {
        db.collection('users').where('email', '==', user.email).get()
        .then(snapshot => {
          const tripID = snapshot.docs[0].id;
          db.collection('users').doc(tripID).collection('favorites').where('tripID', '==', props.trip.id).get()
          .then(snapshot => {
            const doc = snapshot.docs[0];
            if (doc) {
              const newData = data.map(item => {
                if (item.id === 3)
                  return {
                    id: 3,
                    icon: 'star',
                    text: 'Сохранено в закладках'
                  };
                else return item;
              });
              setData(newData);
            };
            }
          );
        });
      }, []);

      function doSomething(it) {
        switch (it.id) {
          case 3: {
            saveToFavorites(it)
          }
        }
      };

      return (
        <View>
          <TouchableOpacity
            style={styles.button}
            key={it.id}
            onPress={() => { doSomething(it) }}>
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
