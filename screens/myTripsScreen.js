import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { db } from '../firebase/config';
import Loading from './loadingScreen';
import TripPreview from '../components/tripPreview';
import SearchBar from '../components/searchBar';
import { AuthenticatedUserContext } from '../navigation/authenticatedUserProvider';
import Colors from '../constants/colors';

const MyTripsScreen = props => {
  const [ data, setData ] = useState([]);
  const [ fullData, setFullData ] = useState([]);
  const [ loading, setLoading ] = useState([true]);
  const { user } = useContext(AuthenticatedUserContext);

  const renderFeedItem = (itemData) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TripPreview item={itemData.item} route={props.route}/>
      </View>
    )
  };

  async function getTripsData(snapshots) {
    return snapshots.docs.map(snapshot => {
      db.collection('trips').doc(snapshot.data().tripID).get()
        .then(doc => ({
          id: doc.data().id,
          organiser: doc.data().organiser,
          location: doc.data().location,
          duration: doc.data().duration,
          length: doc.data().length,
          category: doc.data().category || '-',
          participants: doc.data().participants,
          picUrl: '../assets/images/feed_default.png',
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate.toDate(),
          description: doc.data().description,
        }));
    });
  };

  useEffect(() => {
    db.collection('users').where('email', '==', user.email).get()
    .then(snapshot => {
      const userID = snapshot.docs[0].id;
      db.collection('users').doc(userID).collection('favorites').onSnapshot(snapshots => {
        const data = snapshots.docs.map(snapshot => ({
          id: snapshot.data().tripID,
          organiser: snapshot.data().organiser,
          location: snapshot.data().location,
          duration: snapshot.data().duration,
          length: snapshot.data().length,
          category: snapshot.data().category || '-',
          participants: snapshot.data().participants,
          picUrl: '../assets/images/feed_default.png',
          startDate: snapshot.data().startDate.toDate(),
          endDate: snapshot.data().endDate.toDate(),
          description: snapshot.data().description,
        }));
        setFullData(data);
        setData(data);
        setLoading(false);
      });
    })
  }, [ loading ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderFeedItem}
        keyExtractor={itemData => itemData.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent=<SearchBar fullData={fullData} setData={setData} route={props.route}/> />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleBlue,
  },
});

export default MyTripsScreen;
