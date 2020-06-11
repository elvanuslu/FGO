/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component, useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Button,
  Input,
  Item,
  Content,
  Thumbnail,
} from 'native-base';

import styles from '../styles/styles';
import {header, BosHeader} from '../Component/header';
import {button} from '../Component/button';
import {logoveYazi} from '../Component/logoveYazi';

const logo = require('../assets/logo.png');
const screenBg = require('../assets/Searchekran/background.png');
const gorsel = require('../assets/Searchekran/gorsel3.png');
const adam = require('../assets/Searchekran/adam.png');
const yuvarlak = require('../assets/Searchekran/yuvarlak.png');
const mesajbtn = require('../assets/Searchekran/mesaj.png');
const renklibuton = require('../assets/Searchekran/renklibuton.png');
const ufakbuton = require('../assets/Searchekran/ufakbuton.png');
const offline = require('../assets/Searchekran/offline.png');
const carpi = require('../assets/Searchekran/carpi.png');
import {
  getStorage,
  setStorage,
  connectSocket,
  getData,
} from '../service/service';
let online = null;
let user = null;
export default class SearchMainAsamaIki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      myTextContentType: true,
      timer: 3,
      kullanici: '',
      online: null,
      profilePhoto: null,
    };
  }
  getOnline = async () => {
    const actionData = await getStorage('matchData');
    const key = JSON.parse(actionData).key;
    console.log('authenticated: ' + actionData);
    if (actionData !== null) {
      if (key === 'match_found') {
        //console.log('status: ' + JSON.parse(actionData).data.status);
        online = JSON.parse(actionData).data.status;
        user = JSON.parse(actionData).data.user.name;
        this.setState({kullanici: user});

        this.setState({
          profilePhoto: JSON.parse(actionData).data.user.profile_photo,
        });
        console.log('Photo::', this.state.profilePhoto);
        // this.props.navigation.push('SearchMainAsamaIki');
      }
    }
  };
  componentDidMount() {
    this.getOnline();
    /*
    this.interval = setInterval(
      () => this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
    */
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
      this.props.navigation.push('Talk1'); //('Chat', {id: '1'});
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <Container style={{backgroundColor: 'transparent'}}>
        <ImageBackground source={screenBg} style={styles.imageContainer}>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Image style={styles.LogoKucuk} source={logo} />
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Thumbnail
              style={{
                width: 210,
                height: 210,
                borderRadius: 210 / 2,
                borderWidth: 5,
              }}
              borderColor="white"
              source={{uri: this.state.profilePhoto}}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                style={{width: 20, resizeMode: 'contain', alignSelf: 'center'}}
                source={online === 'online' ? ufakbuton : offline}
              />
            </View>
            <View>
              <Text style={{marginRight: 10}}>
                {this.state.kullanici} <Text style={{color: 'gray'}} />
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{
                width: '70%',
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={renklibuton}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fb356f',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Sohbet Başlıyor ... {this.state.timer}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'transparent', marginTop: 0}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('SearchMainAsamaBir')}>
              <View>
                <Image
                  style={{
                    height: 80,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={carpi}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
