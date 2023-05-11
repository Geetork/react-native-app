import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import React from 'react';

import Colors from '../constants/colors';

const StartScreen = props => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{  width: "100%", height: "100%" }}
        source={ require('../assets/images/login_screen.png') }>
        <View style={styles.box}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.button]}
            onPress={() => {props.navigation.navigate({
              name: 'Регистрация',
              params: {type: 'Регистрация'}})}}>
            <Text style={styles.textButton}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {props.navigation.navigate({
              name: 'Регистрация',
              params: {type: 'Вход'}
            })}}>
            <Text style={styles.text}>Уже есть аккаунт?</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 80
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primary,
    textAlign: "center",
  },
  text: {
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontSize: 13,
    marginTop: 20
  },
  textButton: {
    color: Colors.primary,
    fontSize: 17,
  },
});

export default StartScreen;
