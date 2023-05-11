import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const AddTripModal = (props) => {
  const { modalVisible, setModalVisible } = props;

  return (
    <View style={[styles.container, (modalVisible) ? {backgroundColor: Colors.heading, opacity: 0.2} : {opacity: 0.3}]}>
      <Modal animationType='slide' transparent={false} visible={modalVisible}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{ margin: 50, }}
              onPress={() => {setModalVisible(!modalVisible)}}>
              <Ionicons style={{}} name='close-circle-outline' size={35} color={Colors.navyBlue}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default AddTripModal;
