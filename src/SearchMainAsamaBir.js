/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
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
} from 'native-base';

import styles from '../styles/styles';
import {header, BosHeader} from '../Component/header';
import {button} from '../Component/button';
import {logoveYazi} from '../Component/logoveYazi';
import {
  getStorage,
  setStorage,
  getObject,
  connectSocket,
  getData,
} from '../service/service';
import {
  clientConnect,
  socketState,
  socketClose,
  sendToken,
  sendMatch,
  onHandler,
  match_responseType,
} from '../Component/client';
const logo = require('../assets/logo.png');
const screenBg = require('../assets/Searchekran/background.png');
const gorsel = require('../assets/Searchekran/gorsel2.png');
const adam = require('../assets/Searchekran/adam.png');
const carpi = require('../assets/Searchekran/carpi.png');
const yuvarlak = require('../assets/Searchekran/yuvarlak.png');
const mesajbtn = require('../assets/Searchekran/mesaj.png');
const arrowbtn = require('../assets/Searchekran/arrowbtn.png');
const kirmiziButton = require('../assets/kbuton.png');
const slide = require('../assets/Searchekran/slide.png');
var mesaj = {};
var messiah = {};

export default class SearchMainAsamaBir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      myTextContentType: true,
      ws: null,
      messages: '',
    };
  }

  startMatching = async () => {
    try {
      console.log('startMatching....');
      var {ws} = this.state;
      const gender = await getStorage('gender');
      // ws.addEventListener('message', this.onHandler, true);
      let actionData = JSON.stringify({
        action: 'start_matching',
        data: {
          instant: 'true',
          gender: gender,
        },
      });
      ws.send(actionData);
      onHandler(e);
      /*
      ws.onmessage = e => {
        console.log(
          'Online Mesajı= ' + e.data + ' ' + new Date().toISOString(),
        );
      };*/
      ws.onerror = err => {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket',
        );

        // ws.close();
      };
    } catch (error) {
      console.error('catch encountered error: ', error, 'Closing socket');
      ws.close();
    }
  };
  connect = async () => {
    var {ws} = this.state;
    ws = new WebSocket('ws://api-dev.fogotalk.com:5005/');
    //ws.binaryType = 'blob';
    // WS_EVENTS.forEach(ev => ws.addEventListener(ev, this.onHandler, true));
    //ws.addEventListener('message', this.onHandler, true);
    setStorage('ws', ws);
    var connectInterval;

    ws.onopen = async () => {
      console.log('connected websocket main component');

      this.setState({ws: ws});

      //this.timeout = 250; // reset timer to 250 on open of websocket connection
      // clearTimeout(connectInterval); // clear Interval on on open of websocket connection
      const userInfo = await getStorage('token');
      const gender = await getStorage('gender');
      //console.log('Token: ' + userInfo);
      var token = JSON.stringify({
        token: userInfo,
        // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVlMDViMDgxZTNhMzhmMTdlMzMxNTc0OCIsInVzZXJuYW1lIjoiZ3VsQGd1bC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU3NzQzMTE2OX0.X0RA9Y7yvOA1V-RDCeYlM2abehfzb-BCjonkEd25VHs',
      });
      ws.send(token);
      /*
      ws.onmessage = e => {
        console.log('Online Mesajı= ' + e.data);
      };
*/

      //console.log('actionData: ' + actionData);
      //ws.send(actionData);
      /*
      setTimeout(() => {
        ws.send(actionData);
        ws.onmessage = e => {
          console.log(
            'Dönen Search Aşama 1.2=' +
              e.data +
              ' Zaman: ' +
              new Date().toISOString(),
          );
          mesaj = e.data;
          if (e.data.key === 'match_found') {
            this.setState({messages: e.data});
          }
          console.log('state: ' + JSON.stringify(this.state.messages));
          console.log(
            'Mesaji: ' + mesaj + ' Zaman: ' + new Date().toISOString(),
          );
          this.setState({messages: mesaj});
        };
      }, 3000);
      setTimeout(() => {
        ws.onmessage = e => {
          console.log('Dönen Search Aşama 1.3=' + e.data);
          mesaj = e.data;
          if (e.data.key === 'match_found') {
            this.setState({messages: e.data});
          }
          console.log('state: ' + JSON.stringify(this.state.messages));
          console.log('Mesaj 2: ' + mesaj);
        };
      }, 3000);
     
      ws.onerror = err => {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket',
        );

        ws.close();
      }; */
    };
  };
  check = async () => {
    const {ws} = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      await this.connect();
    } //check if websocket instance is closed, if so call `connect` function.
  };

  componentDidMount = async () => {
    var w = await getStorage('ws');
    const token = await getStorage('token');
    var gender = await getStorage('gender');
    const durum = socketState();
    console.log('durumm: ' + durum);

    match_responseType('accepted');
    //  console.log('match response: ' + JSON.stringify(match_responseType()));
    try {
      console.log('wsnin Durumu: ' + ws.readyState);
      ws.onmessage = e => {
        console.log(
          'Online Mesajı= ' + e.data + ' ' + new Date().toISOString(),
        );
      };
    } catch (error) {
      console.log('mount Hata: ' + error);
    }
  };
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
              flex: 4,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Image style={styles.OrtaGorsel} source={gorsel} />
          </View>
          <View
            style={{
              flex: 0.7,
              backgroundColor: 'transparent',
            }}>
            <Image
              style={{width: 50, resizeMode: 'contain', alignSelf: 'center'}}
              source={slide}
            />
          </View>
          <View
            style={{
              flex: 1.5,
              backgroundColor: 'transparent',
            }}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('SearchMainAsamaIki')
                }>
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
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
