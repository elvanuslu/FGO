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
  Alert,
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

import moment from 'moment';

import styles from '../styles/styles';
import {header, BosHeader} from '../Component/header';
import {button} from '../Component/button';
import {logoveYazi} from '../Component/logoveYazi';
import * as matchActions from './redux/actions/';

import {
  getStorage,
  setStorage,
  getObject,
  connectSocket,
  getData,
  RoomInfo,
  getNextQuestion,
  conversationInfo,
  conversationList,
} from '../service/service';
import {connect} from 'react-redux';
import {
  MatchUser,
  ReceiveMessage,
  ReceiveError,
  message,
  Accept,
  Reject,
  returnThis,
  JoinRoom,
  CheckConnection,
} from '../Component/client';
import {spinner} from '../Component/spinner';
import CountDown from 'react-native-countdown-component';

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
const button2 = require('../assets/button_002.png');
const ufakbuton = require('../assets/Searchekran/ufakbuton.png');
const offline = require('../assets/Searchekran/OfflineButton.png');

let online = null;
let user = null;
var myInterval = 0;
class SohbetBaslat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      myTextContentType: true,
      messages: '',
      kullanici: '',
      wSock: null,
      profilePhoto: null,
      timer: 3,
      Istek: false,
      matchId: null,
      conversationID: null,
      eventDate: moment
        .duration()
        .add({days: 1, hours: 3, minutes: 40, seconds: 50}),
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    };
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.Name === this.props.Name) {
    }
    if (this.state.timer === 0) {
      clearInterval(this.interval);
      this.props.navigation.push('Chat');
    }
  };
  componentDidMount = async () => {
    try {
      console.log('Sohbet Başlat proplar: ', this.props);
      this.setState({loading: true});
      await MatchUser(this.props.gender);
      if (this.props.Ws !== null || this.props.Ws.readyState === 1) {
        this.props.Ws.onmessage = e => {
          message(e);
          console.log('SohbetBaslat() e.data::', e.data);
          if (e.data) {
            if (JSON.parse(e.data).key === 'match_found') {
              Accept(this.props.Match);
              this.setState({loading: false});
              this.setState({kullanici: JSON.parse(e.data).data.user.name});
              matchActions.setMATCH_NAME(JSON.parse(e.data).data.user.name);
              matchActions.setMATCH_ID(JSON.parse(e.data).data.id);
              matchActions.setMATCH_GENDER(JSON.parse(e.data).data.user.gender);
              matchActions.setMATCH_PROFILE_PHOTO(
                JSON.parse(e.data).data.user.profile_photo,
              );
              matchActions.setMATCH_COUNTRY(
                JSON.parse(e.data).data.user.origin.country,
              );
              matchActions.setMATCH_CITY(
                JSON.parse(e.data).data.user.origin.city,
              );
              matchActions.setMATCH_LOCALE(JSON.parse(e.data).data.user.locale);
              matchActions.setMATCH_DISTANCE(
                JSON.parse(e.data).data.user.distance,
              );
            }
            this.setState({
              profilePhoto: JSON.parse(e.data).data.user.profile_photo,
            });
            if (e.data.key === 'conversation_created') {
              this.setState({
                conversationID: JSON.parse(key).data.conversation_id,
              });
              matchActions.setCONVERSATIONID(
                JSON.parse(key).data.conversation_id,
              );
              this.setState({loading: false});
            }
            if (e.data.key === 'party_rejected_matching') {
              console.log('party_rejected_matching oldu');
              this.props.navigation.navigation('SearchMain');
            }
          } else {
            this.setState({loading: false});
            Alert.alert(
              'Hata Oluştu',
              'Ws is null',
              [{text: 'Tamam', onPress: () => ''}],
              {
                cancelable: true,
              },
            );
          }
        };
      } else {
        console.log('ws Hatası: ', this.props.WS);
        CheckConnection();
        this.props.navigation.push('SearchMain');
      }
    } catch (error) {
      this.setState({loading: false});
      Alert.alert('Hata Oluştu', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };

  onTimer = async () => {
    this.interval = setInterval(
      () => this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
  };
  componentWillUnmount() {
    console.log('willUnmount sohbetbaslat');
    this.setState({Istek: false});
    this.setState({timer: 3});
    this.setState({kullanici: ''});
  }

  onSohbetIstegi = async () => {
    try {
      console.log('onSOhbet Istegi: ', this.props);
      this.setState({Istek: true});

      //  if (this.props.Match !== null) {
      //console.log('this.props.matchId:', this.props.Match);

      this.interval = setInterval(() => {
        this.setState(prevState => ({timer: prevState.timer - 1}));
      }, 1000);
      //   }
    } catch (error) {
      //console.log('onSohbetIsteği () ' + error);
      Alert.alert('Hata', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  onReject = async () => {
    try {
      this.setState({loading: false});
      var matchId = await getStorage('matchId');
      console.log('matchId: ' + matchId);
      if (matchId !== '') {
        console.log('matchId Accept: ' + matchId);
        // Reject(this.state.wSock, matchId);
        this.props.navigation.push('SearchMain');
      }
    } catch (error) {
      console.log('onSohbetIsteği () ' + error);
      Alert.alert('Hata', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  render() {
    return (
      <Container style={{backgroundColor: 'transparent'}}>
        <ImageBackground source={screenBg} style={styles.imageContainer}>
          {spinner(this.state.loading)}
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
              flex: 3,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Thumbnail
              style={{
                width: 210,
                height: 210,
                borderRadius: 210 / 2,
                borderWidth: 5,
              }}
              borderColor="white"
              source={
                this.state.profilePhoto
                  ? {
                      uri: this.state.profilePhoto,
                    }
                  : {yuvarlak}
              }
              //):source={yuvarlak}
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
                style={{width: 30, resizeMode: 'contain', alignSelf: 'center'}}
                source={online === 'online' ? offline : ufakbuton}
              />
            </View>
            <View>
              <Text>
                {this.state.kullanici} <Text style={{color: 'gray'}} />
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              alignItems: 'center',
            }}>
            {this.state.Istek === false ? (
              <TouchableOpacity onPress={() => this.onSohbetIstegi()}>
                <Image
                  source={button2}
                  style={{width: 300, height: 60, resizeMode: 'contain'}}
                />
                <View style={styles.absoluteView}>
                  <Text style={{color: 'red', fontSize: 14}}>
                    SOHBET İSTEĞİ GÖNDER
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.onSohbetIstegi()}>
                <Image
                  source={button2}
                  style={{width: 300, height: 60, resizeMode: 'contain'}}
                />
                <View style={styles.absoluteView}>
                  <Text style={{color: 'red', fontSize: 14}}>
                    Sohbet Başlıyor ... {this.state.timer}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1.5,
              backgroundColor: 'transparent',
            }}>
            <View>
              <TouchableOpacity
                onPress={
                  () => this.onReject() //this.props.navigation.push('SearchMainAsamaBir') //('SearchMainAsamaIki')
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
const mapStateToProps = (state, ownProps) => ({
  userName: state.auth.username,
  userId: state.auth.uid,
  emailId: state.profile.email,
  //tokenId: state.userReducers.token,
  gender: state.profile.gender,
  role: state.auth.role,
  Ws: state.sock.WS,
  Match: state.match,
  Name: state.match.Name,
  matchId: state.match.matchId,
  UserId: state.match.UserId,
  Gender: state.match.Gender,
  profile_photo: state.match.profile_photo,
  Country: state.match.Country,
  City: state.match.City,
  Locale: state.match.locale,
  Distance: state.match.distance,
  ConversationID: state.match.ConversationID,
});
export default connect(mapStateToProps)(SohbetBaslat);
