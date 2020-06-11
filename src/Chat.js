/* eslint-disable no-lone-blocks */
/* eslint-disable no-bitwise */
/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

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
  PermissionsAndroid,
  Toast,
  Alert,
  FlatList,
  TouchableHighlight,
  YellowBox,
  Modal,
  KeyboardAvoidingView,
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
  Card,
  CardItem,
  Footer,
  List,
  ListItem,
  Radio,
  CheckBox,
  Thumbnail,
  H3,
} from 'native-base';

import Soru from './Soru/Soru';
import personal from '../styles/PersonalChatStyles';
import Video from 'react-native-video';
import styles from '../styles/styles';
import {header, headerRenkli} from '../Component/header';
import {spinner} from '../Component/spinner';
import images from '../Themes/Images';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  TalkHeaderWithTouch,
  buttonOnPressWithWidth,
  GrafikSoru,
  VideoSoru,
} from '../Component/button';

import {
  getStorage,
  setStorage,
  getNextQuestion,
  RoomInfo,
  conversationInfo,
  conversationMessage,
  sendAnswer,
} from '../service/service';
import {
  returnSocket,
  sendRoomInfo,
  JoinRoom,
  SendMessage,
  IncomingMessage,
  Accept,
  ReceiveMessage,
} from '../Component/client';
import LinearGradient from 'react-native-linear-gradient';

import {textSoru} from '../Component/Sorular';
import Animated from 'react-native-reanimated';

import {connect} from 'react-redux';
import * as userActions from './redux/actions/';
import {analytics} from 'react-native-firebase';
import OneToMany from './OneToMany';
import OverlayView from '../Component/Shared/OverlayView'; // ../../../Component/Shared/OverlayView';

const ustBar = require('../assets/talk/ustbar.png');
const kizlar = require('../assets/talk/kizlar.png');
const bosprofildolu = require('../assets/talk/bosprofildolu.png');
const bosyuvarlaksayacsiz = require('../assets/talk/bosyuvarlaksayacsiz.png');
const check = require('../assets/talk/check.png');
const bosyuvarlak3 = require('../assets/talk/bosyuvarlak3.png');
const cizgi = require('../assets/talk/cizgi.png');
const iki = require('../assets/talk/bos2.png');
const dort = require('../assets/talk/bos4.png');
const bes = require('../assets/talk/bos5.png');
const sendbuton = require('../assets/talk/sendbuton.png');
const foto = require('../assets/talk/foto.png');
const send = require('../assets/talk/send.png');
const unlem = require('../assets/talk/unlem.png');
const carpi = require('../assets/talk/carpi.png');
const geri = require('../assets/ok.png');

const devicewidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const profileOne =
  'http://antiqueruby.aliansoftware.net//Images/social/ic_msg_user01_s21_29.png';
const profileTwo =
  'http://antiqueruby.aliansoftware.net//Images/social/ic_msg_user02_s21_29.png';
const COLORS = ['deepskyblue', 'fuchsia', 'lightblue '];
const dataObjects = [
  {
    id: 1,
    userId: 1,
    uid: '',
    profile: '',
    message: '',
    currentMsg: false,
    Seperator: '',
  },
];
var temporary = {
  id: 10,
  userId: 1,
  uid: '',
  Sorumu: false,
  profile: {uri: profileOne},
  message: '',
  currentMsg: true,
  Separator: '',
};
var Sorular = {
  id: 1,
  UserId1: 1,
  type: null,
  Soru: null,
  timestamp: null,
  button: false,
};
let Sorularim = [
  {
    id: 1,
    Soru: null,
    type: null,
    Sorumu: false,
    timestamp: null,
    Cevaplar: [
      {UserId1: 1, UserId2: 2, type: null, message: null, timestamp: null},
    ],
  },
];

var dataObject = [];

var socket = null;
var indx = 0;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durum: false,
      loading: false,
      selected: false,
      selectedItem: null,
      soruTipi: 0,
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      currentText: '',
      myId: 14,
      matchUser: '',
      token: '',
      roomId: '',
      userId: '',
      message: '',
      Uid: '',
      conversationID: null,
      index: 0,
      SoruDurumu: '',
      dsSorular: [],
      dsSoru: [],
      Soru: '',
      SoruId: '',
      Step: 1,
      Cevaplandimi: false,
      modalVisible: false,
      dsCevaplar: [],
      dsSoruCevap: [],
      buttonVar: false,
      party_answered: false,
      Unlem: false,
      Carpi: false,
      Yaziyor: false,
      benimID: '',
      YeniSoruButton: false,
    };
  }
  getMatchUser = async () => {
    try {
      const actionData = await getStorage('matchData');
      const room_id = await getStorage('room_id');
      const token = await getStorage('token');
      const uid = await getStorage('id');
      var conversation_id = this.props.ConversationID; //await getStorage('conversation_id');
      this.setState({conversation_id: conversation_id});
      console.log('conversationID::', conversation_id);
      console.log('room_id: ' + room_id);
      console.log('Action Data: ', actionData);
      this.setState({roomId: room_id});
      this.setState({token: token});
      this.setState({Uid: uid});
      console.log('room: ' + this.state.roomId);

      console.log('uid: ' + this.state.Uid);
      if (room_id !== null) {
        JoinRoom(uid, conversation_id);
      }
    } catch (error) {
      console.log('getMatchUser() => ' + error);
      Alert.alert('MatchUser', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  sendMessage = msg => {
    try {
      let info = JSON.stringify({
        action: 'chat_message',
        data: {
          room_id: this.state.conversationID,
          message: msg,
        },
      });
      // console.log('Inf: ' + info);
      SendMessage(info);
    } catch (error) {
      console.log('sendMessage: ' + error);
    }
  };
  onchangeText = async val => {
    //console.log('onchangeText');
    this.setState({currentText: '', myId: this.state.myId + 1});
    this.sendMessage(this.state.currentText);
    temporary = {};
    temporary.id = this.state.myId;
    temporary.userId = this.state.userId;
    temporary.uid = this.state.Uid;
    temporary.profile = {uri: profileTwo};
    temporary.message = this.state.currentText;
    temporary.currentMsg = true;
    temporary.Sorumu = false;
    dataObjects.push(temporary);

    //console.log('temp: ' + JSON.stringify(dataObjects));
    // console.log('this.state.benimID:', this.props.userId);
    let chatData = {};
    chatData.id = this.createGuid();
    chatData.userId = this.props.userId;
    chatData.type = 'incoming_message';
    chatData.Soru = this.state.currentText;
    chatData.profile = {uri: profileTwo};
    chatData.currentMsg = true;
    this.state.dsSoruCevap.push(chatData);
  };

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  renderSorularm = (item, index) => {
    if (item.type === 'questionnaire') {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 20,
            marginTop: 1,
          }}>
          <Text
            style={{
              color: '#e53935',
              fontFamily: 'Raleway-Regular',
              textAlign: 'center',
            }}>
            Q{item.step}:
            <Text
              style={{
                color: '#424242',
                fontWeight: 'normal',
                fontFamily: 'Raleway-Regular',
              }}>
              {' '}
              {
                item.Soru
                //this.state.Soru
              }
            </Text>
          </Text>
        </View>
      );
    } else if (item.type === 'user_answer') {
      return (
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            marginRight: 10,

            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Left style={{backgroundColor: 'transparent'}}>
            <Text>{index % 2 !== 0 ? item.Soru : null}</Text>
          </Left>

          <Right>
            <Text>{index % 2 === 0 ? item.Soru : null}</Text>
          </Right>
          <View style={{width: 0.5}} />
        </View>
      );
    }
  };

  SorularCevaplar = async () => {
    try {
      let sira = 1;

      //console.log('pross: ', this.props);
      dataObjects.length = 0;
      let Sorularim = [
        {
          id: 1,
          Soru: null,
          type: null,
          Sorumu: false,
          timestamp: null,
          Cevaplar: [
            {
              UserId1: 1,
              UserId2: 2,
              type: null,
              message: null,
              timestamp: null,
            },
          ],
        },
      ];

      let Id = '';

      if (this.props.navigation.state.params !== undefined) {
        console.log(
          'this.props.navigation.state.params.conversationId',
          this.props.navigation.state.params.conversationId,
          this.props.navigation.state.params.Name,
        );
        this.setState({matchUser: this.props.navigation.state.params.Name});
        Id = this.props.navigation.state.params.conversationId;
      } else {
        Id = this.props.ConversationID;
      }
      if (Id !== null) {
        await conversationMessage(Id).then(res => {
          this.setState({loading: false});
          console.log(
            'Sorular ve Cevaplar: ',
            res,
            ' length:',
            res.data.length - 1,
          );

          if (res.status === true && res.data.length > 0) {
            res.data.map((p, i) => {
              console.log('res.data.length:', res.data.length);
              let Soru = {
                id: this.createGuid(),
                type: p.type,
                Soru: p.message,
                timestamp: p.timestamp,
                seen: p.seen,
                step: p.type === 'questionnaire' ? sira++ : sira,
                button:
                  i > 0 &&
                  i <= 15 &&
                  i === res.data.length &&
                  !this.state.buttonVar
                    ? true
                    : false,
              };

              Sorularim.push(Soru);
              //this.setState({modalVisible: false});
            });
            if (Sorularim.length > 0) {
              Sorularim.splice(0, 1);
              if (Sorularim[Sorularim.length - 1].type === 'questionnaire') {
                console.log('true: ', Sorularim[Sorularim.length - 1]);
                Sorularim.splice(Sorularim.length - 1, 1);
                console.log('true2 : ', Sorularim);

                // Sorularim.push(Soru);
              }
              console.log('Sorularim gercek: ', Sorularim);

              this.setState({
                dsSoruCevap: Sorularim,
              });
            }
          }
          console.log('Sorularim 1: ', this.state.dsSoruCevap, Sorularim);
          if (
            this.state.dsSoruCevap.length === 0 ||
            (Sorularim.length % 3 === 0 && Sorularim.length < 15)
          ) {
            let Soru = {
              id: this.createGuid(),
              type: '',
              Soru: '',
              seen: false,
              button: true,
            };
            Sorularim.push(Soru);
            this.setState({
              dsSoruCevap: Sorularim,
            });
          }
        });

        
      }

      this.setState({buttonVar: false});
    } catch (error) {
      this.setState({loading: false});
      Alert.alert(
        'Question Error',
        error,
        [{text: 'Tamam', onPress: () => ''}],
        {
          cancelable: true,
        },
      );
    } finally {
      // this.scrollToIndex();
    }
  };

  componentWillUnmount() {
    //console.log('componentWillUnmount Chat');
    ReceiveMessage();
  }
  onConversationInfo = async () => {
    console.log('conversationID::', this.props.ConversationID);
    await conversationInfo(this.props.ConversationID).then(res => {
      console.log('conversationInfo:: ' + JSON.stringify(res));
      if (res.status === true) {
        setStorage('conversationInfo', JSON.stringify(res));
        //console.log('STatus: ' + res.status);
      }
    });
  };

  componentDidMount = async () => {
    //console.log('this.state.mode.', this.state.modalVisible);
    this.setState({loading: true});
    if (this.props.navigation.state.params !== undefined) {
      this.setState({matchUser: this.props.navigation.state.params.Name});
    } else {
      this.setState({matchUser: this.props.Name});
    }

    dataObjects.length = 0;
    temporary = {};
    this.props.Ws.onmessage = e => {
      this.setState({loading: false});
      console.log('chat mesajı : ', e.data);
      if (JSON.parse(e.data).key === 'incoming_message') {
        this.setState({userId: JSON.parse(e.data).data.user_id});
        this.setState({message: JSON.parse(e.data).data.message});
        this.setState({currentText: '', myId: this.state.myId + 1});

        temporary = {};
        temporary.id = this.createGuid(); //this.state.myId;
        temporary.uid = this.state.userId;
        temporary.userId = this.state.Uid; //JSON.parse(e.data).data.user_id;
        temporary.profile = {uri: profileOne};
        temporary.message = JSON.parse(e.data).data.message;
        temporary.currentMsg = true;
        temporary.Sorumu = true;
        temporary.Seperator = '';
        dataObjects.push(temporary);

        let chatData = {};
        chatData.id = this.createGuid();
        chatData.userId = JSON.parse(e.data).user_id;
        chatData.type = JSON.parse(e.data).key;
        chatData.Soru = JSON.parse(e.data).data.message;
        chatData.profile = {uri: profileOne};
        chatData.currentMsg = false;
        this.state.dsSoruCevap.push(chatData);
      }
      if (JSON.parse(e.data).key === 'party_answered_question') {
        this.setState({party_answered: true, modalVisible: false});
        this.setState({Unlem: false});
        this.setState({Yaziyor: false});
        this.setState({Carpi: false});
      }
      if (JSON.parse(e.data).key === 'typing_on') {
        // console.log('typing on');
        this.setState({Unlem: false});
        this.setState({Carpi: false});
        this.setState({Yaziyor: true});
      }
      if (JSON.parse(e.data).key === 'typing_off') {
        // console.log('typing off');
        this.setState({Unlem: false});
        this.setState({Carpi: false});
        this.setState({Yaziyor: false});
      }
      if (JSON.parse(e.data).key === 'user_gone_offline') {
        //console.log('user_gone_offline');
        this.setState({Carpi: true});
        this.setState({Yaziyor: false});
        this.setState({Unlem: false});
      }
    };
    await this.GetNextQuestion();
    await this.SorularCevaplar();

    this.setState({loading: false});

    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ]);

    this.setState({loading: false});
  };
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.Name !== this.props.Name) {
      this.setState({matchUser: this.props.Name});
      console.log('componentDidUpdate() props=>', this.props);
      console.log('prevProps:', prevProps);
    }
  };

  _onPress = (item, index) => {
    this.setState({selectedItem: item.value});
  };

  //-----------------------------------------
  //TODO: 04.03.2020 party_answered olunca ekrana yeni soru butonunu basması gerekiyor, 5.03.2020 OKI DOKI Oldu
  GetNextQuestion = async () => {
    // console.clear();
    try {
      const Conversation_id = await getStorage('conversation_id');
      this.setState({conversationID: Conversation_id});
      //console.log('Conversaton ID:=>', Conversation_id);

      const ConversationInfo = await getStorage('conversationInfo');
      if (Conversation_id !== null) {
        await getNextQuestion().then((p, i) => {
          //console.log('Chat getNextQuestion:=>', p.data.question);
          // console.log('Chat getNex p:', p);
          // console.log('array data : ', Object.entries(p.data.question));

          this.setState({loading: false});
          if (p !== undefined) {
            if (p.status === true) {
              if (p.data.conversation_status !== 'open') {
                // peopleArray = Object.values(p.data.question);
                //this.setState({dsCevaplar: p.data.question});
                //this.setState({SoruDurumu: p.data.conversation_status});
                // console.log('p:', p);
                this.setState({
                  dsCevaplar: p,
                  SoruDurumu: p.data.conversation_status,
                });

                let Soru = {
                  id: this.createGuid(),
                  type: p.data.question.type,
                  Soru: p.data.question.content,
                  button: false,
                  step: p.data.question.step,
                };
                Sorularim.push(Soru);

                if (Sorularim !== null) {
                  this.setState({
                    // dsSoruCevap: Sorularim,
                    YeniSoruButton: false,
                  });
                }
              }
              if (p.data.conversation_status === 'questionnaire') {
                this.setState({
                  dsSorular: p.data.question.options,
                  dsSoru: p.data.question,
                  Soru: p.data.question.content,
                  SoruId: p.data.question.question_id,
                  Step: p.data.question.step,
                });
              } //open
              else if (p.data.conversation_status === 'open') {
                this.setState({loading: false});
              }
            }
          }
        });
        this.SorularCevaplar();
      } else {
        Alert.alert(
          'Question',
          'Conversation Alınamadı.',
          [{text: 'Tamam', onPress: () => ''}],
          {
            cancelable: true,
          },
        );
      }
    } catch (error) {
      Alert.alert('Question', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  _renderRow(rowData) {
    return (
      <View style={personal.rowMain}>
        {rowData.currentMsg ? (
          <View
            style={[
              personal.rightChatMain,
              rowData.currentMsg
                ? {marginBottom: height * 0.016, marginTop: 1.5}
                : {marginVertical: 1.5},
            ]}>
            <LinearGradient
              locations={[0.1, 0.75]}
              //#1274c1   #116cb3
              colors={['#1274c1', '#116cb3']}
              style={personal.rightChatBox}>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: 'transparent',
                  fontSize: 13,
                }}>
                {rowData.Soru}
              </Text>
            </LinearGradient>
            {rowData.currentMsg === true ? (
              <View style={personal.rightIndicatorMain}>
                <Image
                  source={images.rightChatIndicator}
                  style={personal.rightIndicator}
                />
                {rowData.Sorumu === false ? (
                  <Image
                    source={rowData.profile}
                    style={[personal.profile, {alignSelf: 'flex-end'}]}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
        ) : (
          <View
            style={[
              personal.leftChatMain,
              rowData.currentMsg
                ? {marginBottom: height * 0.016, marginTop: 1.5}
                : {marginVertical: 1.5},
            ]}>
            {rowData.currentMsg === false ? (
              <View style={personal.leftIndicatorMain}>
                {rowData.Sorumu === false ? (
                  <Image source={rowData.profile} style={personal.profile} />
                ) : null}

                <Image
                  source={images.leftChatIndicator}
                  style={personal.leftIndicator}
                />
              </View>
            ) : null}
            <View
              style={[
                personal.leftChatBox,
                rowData.currentMsg
                  ? {marginLeft: height * 0.003}
                  : {marginLeft: height * 0.045},
              ]}>
              <Text style={{color: '#000', fontSize: 13}}>{rowData.Soru}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  sendCevap = async soroId => {
    try {
      let Indx = 0;
      if (soroId) {
        await sendAnswer(soroId, this.state.selectedItem).then(res => {
          this.setState({loading: false});
          this.GetNextQuestion();
          setTimeout(() => {
            console.log('null');
            this.setState({modalVisible: false});
          }, 400);
          this.setState({
            Unlem: true,
            YeniSoruButton: true,
          });
        });
      }
    } catch (error) {
      Alert.alert('Error', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };

  setModalVisible = () => {
    console.log('this.state.mode.', this.state.modalVisible);
    this.setState({
      modalVisible: false,
    });
  };
  getItemLayout = (data, index) => ({length: 50, offset: 50 * index, index});

  renderOptions = () => {
    //console.log('this.state.dsSorular:', this.state.dsSorular);
    return (
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <FlatList
          numColumns={1}
          ref={ref => (this.flatList = ref)}
          extraData={this.state.selectedItem}
          data={this.state.dsSorular} //{DATA}
          keyExtractor={item => item.value.toString()}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({animated: true})
          }
          scrollEventThrottle={10}
          renderItem={({item, index, separators}) => (
            <View style={{backgroundColor: 'transparent'}}>
              <Card
                style={{
                  borderColor: 'transparent',
                  marginTop: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 5,
                }}>
                <CardItem
                  button
                  onPress={() => this._onPress(item, index)}
                  style={
                    this.state.selectedItem === item.value ||
                    this.state.Secilen1 === item.value
                      ? {
                          backgroundColor: '#116cb3',
                          marginTop: 2,
                          borderRadius: 5,
                        }
                      : {
                          backgroundColor: '#fff',
                          marginTop: 2,
                          borderRadius: 5,
                        }
                  }>
                  {
                    //<Icon active name="logo-googleplus" />
                  }
                  <Text
                    style={
                      this.state.selectedItem === item.value
                        ? {
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            fontSize: 12,
                            color: '#fff',
                            alignSelf: 'center',
                          }
                        : {
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            fontSize: 12,
                            alignSelf: 'center',
                          }
                    }>
                    {item.label !== null
                      ? item.label.toUpperCase() + '-'
                      : item.label}{' '}
                    {item.content}
                  </Text>
                  <Right>
                    {
                      //<Icon name="arrow-forward" />
                    }
                  </Right>
                </CardItem>
              </Card>
            </View>
          )}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 5,
          }}>
          <TouchableOpacity onPress={() => this.sendCevap()}>
            <View>
              <Image
                source={sendbuton}
                style={{width: 120, height: 120 / 2.3}}
              />
              <Text
                style={{
                  color: '#ef5350',
                  marginTop: -36,
                  fontSize: 16,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                SEND
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSoruVeChat = () => {
    return (
      <View>
        <FlatList
          ref={ref => (this.flatListSoru = ref)}
          onContentSizeChange={() =>
            this.flatListSoru.scrollToEnd({animated: true})
          }
          numColumns={1}
          extraData={this.state.selectedItem}
          keyExtractor={item => item.id.toString()}
          data={this.state.dsCevaplar}
          renderItem={({item, index, separators}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 20,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#e53935',
                  fontFamily: 'Raleway-Regular',
                  textAlign: 'center',
                }}>
                Q{item.step}:
                <Text
                  style={{
                    color: '#424242',
                    fontWeight: 'normal',
                    fontFamily: 'Raleway-Regular',
                    fontSize: 12,
                  }}>
                  {item.type === 'questionnaire' ? item.message : ''}
                </Text>
              </Text>
              {
                //console.log('objects: ', dataObjects)
              }
              <View>
                <Card
                  style={{
                    borderColor: 'transparent',
                    marginTop: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 5,
                  }}>
                  <CardItem
                    button
                    onPress={() => this._onPress(item, index)}
                    style={
                      this.state.selectedItem === item.value ||
                      this.state.Secilen1 === item.value
                        ? {
                            backgroundColor: '#116cb3',
                            marginTop: 2,
                            borderRadius: 5,
                          }
                        : {
                            backgroundColor: '#fff',
                            marginTop: 2,
                            borderRadius: 5,
                          }
                    }>
                    {
                      //<Icon active name="logo-googleplus" />
                    }
                    <Text
                      style={
                        this.state.selectedItem === item.value
                          ? {
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'center',
                              fontSize: 12,
                              color: '#fff',
                              alignSelf: 'center',
                            }
                          : {
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'center',
                              fontSize: 12,
                              alignSelf: 'center',
                            }
                      }>
                      {item.type === 'user_answer' ? item.message : ''}
                    </Text>
                    <Right>
                      {
                        //<Icon name="arrow-forward" />
                      }
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  renderChat = (item, index) => {
    if (this.state.SoruDurumu === 'questionnaire') {
      //'initial_questionnaire')
      return (
        <Content>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 50,
              marginRight: 50,
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#e53935',
                fontFamily: 'Raleway-Regular',
                textAlign: 'center',
              }}>
              Q{item.step}:
              <Text
                style={{
                  color: '#424242',
                  fontWeight: 'normal',
                  fontFamily: 'Raleway-Regular',
                }}>
                {' '}
                {item.Soru}
              </Text>
            </Text>
          </View>
          {this.renderOptions()}
          <View style={{backgroundColor: 'transparent'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                padding: 5,
              }}>
              <TouchableOpacity onPress={() => this.sendCevap()}>
                <View>
                  <Image
                    source={sendbuton}
                    style={{width: 120, height: 120 / 2.3}}
                  />
                  <Text
                    style={{
                      color: '#ef5350',
                      marginTop: -36,
                      fontSize: 16,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      marginBottom: 20,
                    }}>
                    SEND
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      );
    } else if (this.state.SoruDurumu === 'open') {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'column-reverse',
          }}>
          <List
            dataArray={dataObjects}
            renderRow={itema => this._renderRow(itema)}
          />
        </View>
      );
    }
  };

  //--------------------------------------------------------------------------------------------------------------
  shouldComponentUpdate(nextProps, nextState) {
    /* console.log(
      'shouldComponentUpdate() ',
      nextProps,
      ' nextstate: ',
      nextState,
    );
    */
    return true;
  }
  renderSorular = () => {
    console.log(
      'this.state.dsCevaplar.length:',
      this.state.dsCevaplar.data.question.options.length,
      this.state.dsCevaplar,
    );

    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 1,
            marginTop: -7,
          }}>
          <Text
            style={{
              color: '#e53935',
              fontFamily: 'Raleway-Regular',
              textAlign: 'center',
            }}>
            Q{this.state.dsCevaplar.data.question.step}:
            <Text
              style={{
                color: '#424242',
                fontWeight: 'normal',
                fontFamily: 'Raleway-Regular',
                fontSize: 14,
              }}>
              {' '}
              {this.state.dsCevaplar.data.question.content}
            </Text>
          </Text>
        </View>
        <View style={{backgroundColor: 'transparent', marginVertical: 10}}>
          {this.state.dsCevaplar.data.question.options.map((item, index) => {
            // console.log('itm: ', item, index);
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Card
                  style={{
                    borderColor: 'transparent',
                    marginTop: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 5,
                  }}>
                  <CardItem
                    button
                    onPress={() => this._onPress(item, index)}
                    style={
                      this.state.selectedItem === item.value
                        ? {
                            backgroundColor: '#116cb3',
                            marginTop: 0,
                            borderRadius: 5,
                          }
                        : {
                            backgroundColor: '#fff',
                            marginTop: 0,
                            borderRadius: 5,
                          }
                    }>
                    {
                      //<Icon active name="logo-googleplus" />
                    }
                    <Text
                      style={
                        this.state.selectedItem === item.value
                          ? {
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'center',
                              fontSize: 12,
                              color: '#fff',
                              alignSelf: 'center',
                            }
                          : {
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'center',
                              fontSize: 12,
                              alignSelf: 'center',
                            }
                      }>
                      {item.label !== null
                        ? item.label.toUpperCase() + '-'
                        : item.label}{' '}
                      {item.content.trim()}
                    </Text>
                    <Right>
                      {
                        //<Icon name="arrow-forward" />
                      }
                    </Right>
                  </CardItem>
                </Card>
                {this.state.dsCevaplar.data.question.options &&
                index ===
                  this.state.dsCevaplar.data.question.options.length - 1 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      padding: 5,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.sendCevap(
                          this.state.dsCevaplar.data.question.question_id,
                        )
                      }>
                      <View>
                        <Image
                          source={sendbuton}
                          style={{width: 120, height: 120 / 2.3}}
                        />
                        <Text
                          style={{
                            color: '#ef5350',
                            marginTop: -36,
                            fontSize: 16,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginBottom: 20,
                          }}>
                          SEND
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  renderSoruCevap = () => {
    //console.log('this.state.dsSoruCevap...', this.state.dsSoruCevap);
    return (
      <FlatList
        onContentSizeChange={(contentWidth, contentHeight) =>
          this.flatListRef.scrollToEnd({animated: true})
        }
        numColumns={1}
        ref={ref => (this.flatListRef = ref)}
        extraData={this.state.selectedItem}
        data={this.state.dsSoruCevap}
        keyExtractor={item => item.id.toString()}
        //scrollToEnd={true}
        renderItem={({item, index}) => (
          <View>
            {item.type !== 'incoming_message' ? (
              <View>
                {item.button === true ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',

                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({buttonVar: true, modalVisible: true});
                        //this.GetNextQuestion();
                      }}>
                      <View
                        style={{
                          borderColor: '#fff',
                          backgroundColor: '#116cb3',
                          height: 50,
                          borderRadius: 7,
                          borderWidth: 1,
                          justifyContent: 'center',
                          width: 170,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            //marginRight:10,
                            //justifyContent: 'flex-end',
                          }}>
                          Yeni Soru AL
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : item.type === 'questionnaire' ? (
                  <View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 50,
                        marginRight: 50,
                        marginBottom: 1,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          color: '#e53935',
                          fontFamily: 'Raleway-Regular',
                          textAlign: 'center',
                        }}>
                        Q{item.step}:
                        <Text
                          style={{
                            color: '#424242',
                            fontWeight: 'normal',
                            fontFamily: 'Raleway-Regular',
                            fontSize: 14,
                          }}>
                          {' '}
                          {item.type === 'questionnaire' ? item.Soru : null}
                        </Text>
                      </Text>
                      <View style={{flex: 1, marginTop: 5, width: '100%'}}>
                        {this.state.dsSoruCevap.length === ++index ? null : (
                          // this.renderOptions()
                          <Text>
                            {
                              //this.state.dsSoruCevap.length}: {++index
                            }
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    {index % 2 === 0 ? (
                      <View
                        style={{
                          borderColor: '#fff',
                          backgroundColor: '#fff',
                          height: 40,
                          borderRadius: 7,
                          borderWidth: 1,
                          justifyContent: 'center',
                          flex: 0.55,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            fontSize: 12,
                          }}>
                          {index % 2 === 0 ? item.Soru : null}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                        }}
                      />
                    )}
                    {index % 2 === 1 ? ( //Test
                      <View
                        style={{
                          borderColor: '#fff',
                          backgroundColor: '#116cb3',
                          height: 40,
                          borderRadius: 7,
                          borderWidth: 1,
                          justifyContent: 'center',
                          flex: 0.55,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            fontSize: 12,
                            //marginRight:10,
                            //justifyContent: 'flex-end',
                          }}>
                          {index % 2 === 1 ? item.Soru : null}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          flex: 0.5,
                        }}
                      />
                    )}
                  </View>
                )}
                {index % 3 === 2 ? (
                  <View style={{borderWidth: 0.5, borderColor: 'lightgray'}} />
                ) : null}
              </View>
            ) : null}

            {item.type === 'incoming_message' ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'column-reverse',
                  marginTop: 10,
                }}>
                {this._renderRow(item)}
              </View>
            ) : null}
          </View>
        )}
      />
    );
  };

  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        {this.state.modalVisible && (
          <OverlayView hasLogo closeAction={this.setModalVisible}>
            {this.renderSorular()}
          </OverlayView>
        )}
        <View style={{backgroundColor: 'transparent'}}>
          <StatusBar translucent backgroundColor="transparent" />
          <Header transparent style={{backgroundColor: 'white'}}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('SearchMain')}>
                <Image
                  style={{width: 20, height: 15, marginRight: 10}}
                  source={geri}
                />
              </Button>
            </Left>
            <Body>
              <Title
                style={{
                  color: '#f5326f',
                  fontSize: 12,
                  fontFamily: 'Raleway-Regular',
                }}>
                {this.state.matchUser + ' & Sen'}
              </Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.setState({modalVisible: true})}>
                <MaterialIcon name="dots-vertical" size={20} color="#900" />
              </Button>
            </Right>
          </Header>
        </View>

        <View style={{backgroundColor: 'transparent', height: 70}}>
          {TalkHeaderWithTouch(
            check,
            check,
            check,
            check,
            check,
            this,
            'profile',
          )}
        </View>
        {
          // Middle part of Chat screen
        }
        {spinner(this.state.loading)}

        <KeyboardAvoidingView
          behavior={Platform.Os === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          {this.renderSoruCevap()
          //<OneToMany props={this.props} data={this.state.dsCevaplar} />
          /* <Soru
              props={this.props}
              data={this.state.dsCevaplar}
              pressSendCevap={pressSendCevap}
            />
            */
          }
          <View style={{backgroundColor: 'transparent'}}>
            <View style={{backgroundColor: 'transparent'}}>
              <View style={{backgroundColor: 'transparent'}}>
                <Text
                  style={
                    this.state.Yaziyor === true
                      ? {
                          color: '#e53935',
                          fontFamily: 'Raleway-Regular',
                          fontSize: 12,
                          marginBottom: 5,
                          marginLeft: 20,
                        }
                      : {height: 0, backgroundColor: 'transparent'}
                  }>
                  Yazıyor...
                </Text>
              </View>
              <View
                style={
                  this.state.Carpi === true
                    ? {
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                      }
                    : {height: 0, backgroundColor: 'transparent'}
                }>
                <Image source={carpi} style={styles.imageMargin} />
                <Text
                  style={{
                    color: '#e53935',
                    fontFamily: 'Raleway-Regular',
                    fontSize: 12,
                    marginLeft: 1,
                    marginTop: 10,
                  }}>
                  Konuşmadan ayrıldı...
                </Text>
              </View>
              <View
                style={
                  this.state.Unlem === true
                    ? {
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                      }
                    : {height: 0, backgroundColor: 'transparent'}
                }>
                <Image
                  source={unlem}
                  style={{
                    resizeMode: 'contain',
                    height: 30,
                    marginLeft: -110,
                    marginBottom: 5,
                    marginRight: -106,
                  }}
                />
                <Text
                  style={{
                    color: '#e53935',
                    fontFamily: 'Raleway-Regular',
                    fontSize: 12,
                    marginTop: 10,
                  }}>
                  Cevap bekleniyor...
                </Text>
              </View>
            </View>
            <Footer style={personal.footerStyle}>
              <Left style={{marginRight: -10}}>
                <TouchableOpacity onPress={() => alert('Tıklandı.')}>
                  <Image
                    source={foto}
                    style={{height: 25, width: 25, marginLeft: 25}}
                  />
                </TouchableOpacity>
              </Left>
              <Body
                style={{
                  //marginLeft: -150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Item
                    regular
                    style={{
                      width: devicewidth / 1.7,
                      height: 35,
                      borderRadius: 15,
                      backgroundColor: '#f5f5f5',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Input
                      style={{color: 'black', marginLeft: 5, borderRadius: 15}}
                      placeholder="Message"
                      keyboardType="email-address"
                      placeholderTextColor="#808080"
                      onChangeText={value =>
                        this.setState({currentText: value})
                      }
                      value={this.state.currentText}
                      underlineColorAndroid="transparent"
                    />
                  </Item>
                </View>
              </Body>
              <Right>
                <TouchableOpacity onPress={() => this.onchangeText(this)}>
                  <Text
                    style={{
                      color: '#f53c76',
                      fontFamily: 'Raleway-Bold',
                      fontSize: 18,
                      marginRight: 30,
                    }}>
                    Send
                  </Text>
                </TouchableOpacity>
              </Right>
            </Footer>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userName: state.auth.username,
  userId: state.auth.uid,
  emailId: state.profile.email,
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

export default connect(mapStateToProps)(Chat);
