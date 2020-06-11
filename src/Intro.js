/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  CheckBox,
  ListItem,
  Button,
  Input,
  Item,
} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import {spinner} from '../Component/spinner';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from '../styles/styles';

const logo = require('../assets/logo.png');
const screenBg = require('../assets/griarkaplan.png');
const button1 = require('../assets/button_001.png');
const button2 = require('../assets/button_002.png');

const hosgeldin1 = require('../assets/hosgeldin1.png');
const hosgeldin2 = require('../assets/hosgeldin2.png');
const hosgeldin3 = require('../assets/hosgeldin3.png');

const slides = [
  {
    key: 'somethun',
    //title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: hosgeldin1,
    backgroundColor: '#FF7F64',
  },
  {
    key: 'somethun-dos',
    //title: 'Title 2',
    text: 'Other cool stuff',
    image: hosgeldin2,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    // title: '',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: hosgeldin3,
    backgroundColor: '#22bcb5',
  },
];

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showRealApp: false,
    };
  }
  _onPressJoinUs = () => {
    this.props.navigation.push('register');
  };
  _onPressSignIn = () => {
    this.props.navigation.push('login');
  };
  Intro = () => {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        slides={slides}
        onDone={this._onDone}
      />
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _onDone = () => {
    this.setState({showRealApp: true});
    alert('Tutorial Finished.');
  };
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <Image style={styles.LogoKucuk} source={logo} />
        </View>
        <View style={{flex: 6, backgroundColor: 'transparent'}}>
          {this.Intro()}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          {this.onSkipButton()}
        </View>
      </Container>
    );
  }

  onSkipButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push('SearchMain');
        }}>
        <View>
          <Image
            source={button2}
            style={{
              width: '90%',
              height: 55,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: 'red',
              marginTop: -37,
              fontSize: 14,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {' '}
            SKIP TUTORIAL
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
}
