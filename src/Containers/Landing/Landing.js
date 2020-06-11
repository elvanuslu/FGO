/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from '../../../styles/styles';
import logo from '../../../assets/logo.png';
import screenBg from '../../../assets/backround.png';
import button1 from '../../../assets/button_001.png';
import button2 from '../../../assets/button_002.png';

const Landing = props => {
  const _onPressJoinUs = () => {
    props.navigation.push('register');
  };

  const _onPressSignIn = () => {
    props.navigation.push('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ImageBackground source={screenBg} style={styles.imageContainer}>
        <View style={styles.LogoContainer}>
          <Image style={styles.Logo} source={logo} />
        </View>
        <View style={styles.containerFlex1Center}>
          <View style={{margin: 5}}>
            <TouchableOpacity
              style={{margin: 30}}
              onPress={() => _onPressJoinUs()}>
              <Image
                source={button1}
                style={{width: 300, height: 60, resizeMode: 'contain'}}
              />
              <View style={{alignSelf: 'center', marginTop: -40}}>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  {' '}
                  JOIN US
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}}>
            <TouchableOpacity onPress={() => _onPressSignIn()}>
              <Image
                source={button2}
                style={{width: 300, height: 60, resizeMode: 'contain'}}
              />
              <View style={styles.absoluteView}>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                  {' '}
                  SIGN IN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // alignSelf: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => _onPressSignIn()}>
              <Text
                style={{color: 'gray', fontSize: 14, textAlign: 'center'}}>
                By Signing up you agree to our{' '}
                <Text style={{color: '#fd4e4e', fontWeight: 'bold'}}>
                  {' '}
                  {'\n'}Terms of Service & Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Landing;
