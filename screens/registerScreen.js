import {  View,
          StyleSheet,
          ImageBackground,
          Image,
          Text,
          TextInput,
          TouchableOpacity,
          Keyboard,
          TouchableWithoutFeedback,
        } from 'react-native';
import React from 'react';

import Colors from '../constants/colors';

const RegisterScreen = ({navigation, route}, props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={ route.params.type === 'Регистрация'
                  ? require('../assets/images/register_login_screen.png')
                  : require('../assets/images/register_login_screen2.png')}>
        <View style={{flex: 1, justifyContent: 'center', width: '100%', height: '100%'}}>
          <View style={styles.box}>
            <View style={styles.form}>
              <Text style={styles.heading}>{route.params.type}</Text>
              <TextInput
                style={styles.textInput}
                placeholder='Почта'/>
              <TextInput
                style={styles.textInput}
                placeholder='Пароль'/>
              <Text style={styles.text}>{
                route.params.type === 'Регистрация' ? 'Зарегистрировать через:' :
                  'Войти через:'}</Text>
              <View style={styles.icons}>
                <Image
                  style={styles.icon}
                  source={ require('../assets/images/instagram_icon.png') } />
                <Image
                  style={styles.icon}
                  source={ require('../assets/images/vk_icon.png') } />
                <Image
                  style={styles.icon}
                  source={ require('../assets/images/telegram_icon.png') } />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {navigation.navigate('Лента')}}>
                <Text style={styles.buttonText}>Далее</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    height: '60%',
    width: '70%',
    borderColor: Colors.lightGray,
    borderWidth: 0.17,
    borderRadius: 15,
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(244, 255, 255, 0.05)',
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20
  },
  heading: {
    color: Colors.secondary,
    fontSize: 22,
    paddingVertical: 40,
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 20,
    color: Colors.primary,
  },
  text: {
    color: Colors.secondary,
    fontSize: 13,
    marginTop: 30,
    marginBottom: 10
  },
  button: {
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 30,
    width: 120,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 15,
    textAlign: "center",
  },
});
