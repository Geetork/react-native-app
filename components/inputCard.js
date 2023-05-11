import React, { useState } from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
       } from 'react-native';

import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const InputCard = props => {
  const nameDefault = props.title;
  const [name, setName] = useState(nameDefault);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 }}>
      <View style={[styles.circle, {backgroundColor: Colors.secondary }]}/>
      <View style={[styles.card, {height: props.title === 'Описание похода' ? 150 : 50 }, {backgroundColor: Colors.secondary }]}>
        <View style={{ flexDirection: 'row',  justifyContent: 'space-between', }}>
          {
            props.numberOfFields > 1 ?
              props.title.map(title => {
                return <View style={{ flexDirection: 'row', width: '32%', alignItems: 'center', justifyContent: 'center' }}>
                  <TextInput
                    style={[styles.textInput, {backgroundColor: Colors.lightBlue }, {color: Colors.secondary }]}
                    placeholder={title}
                    onChangeText={(name) => {setName(name)}}/>
                </View>
              }) :
              <View style={{ marginLeft: 17, marginRight: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {
                  props.title === 'Описание похода' ?
                    <TextInput
                      multiline
                      numberOfLines={10}
                      style={[styles.textInput, { marginRight: 5, height: 140, backgroundColor: Colors.lightBlue }, {color: Colors.navyBlue }]}
                      placeholder={props.title}
                      onChangeText={(name) => {props.setFormData(name); console.log(name)}}/>
                  : <TextInput
                    style={[styles.textInput, { marginRight: 5, backgroundColor: Colors.lightBlue }, {color: Colors.navyBlue }]}
                    placeholder={props.title}
                    onChangeText={(name) => setName(name)}/>
                }
                <View>
                  {
                    name === '' ?
                      <Ionicons name='alert-circle-outline' size={30} color={Colors.error}/> :
                      <Ionicons name='checkmark-circle-outline' size={30} color={Colors.navyBlue}/>
                  }
                </View>
              </View>
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: '91%',
    padding: 5,
    paddingTop: 5,
  },
  textInput: {
    width: '100%',
    alignSelf: 'center',
    padding: 12,
    fontSize: 14,
    borderRadius: 6,

  },
  text: {
    fontSize: 12,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 10,
  },
});

export default InputCard;
