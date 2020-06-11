/* eslint-disable no-lone-blocks */
/* eslint-disable no-bitwise */
/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component, createRef} from 'react';

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
  I18nManager,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
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
  Separator,
} from 'native-base';

import {
  GiftedChat,
  MessageText,
  Bubble,
  Composer,
} from 'react-native-gifted-chat';

import personal from '../styles/PersonalChatStyles';
import Video from 'react-native-video';
import styles from '../styles/styles';
import {header, headerRenkli} from '../Component/header';
import {spinner} from '../Component/spinner';
import Images from '../Themes/Images';
import {Metrics, Colors} from '../Themes';

import moment from 'moment/min/moment-with-locales';

import {
  TalkHeader,
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
  getNextQuestionId,
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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import {textSoru} from '../Component/Sorular';
import Animated from 'react-native-reanimated';

import {connect} from 'react-redux';
import * as userActions from './redux/actions/';
import {analytics} from 'react-native-firebase';
import {CustomMessageText, RenderBubble} from '../Component/CustomMessageText';
import AccessoryBar from './AccessoryBar';

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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Fourth Item',
  },
];
var tips = 0;
const devicewidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const profileOne =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user01_s21_29.png';
const profileTwo =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user02_s21_29.png';
const profileThree =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user03_s21_29.png';
const profileFour =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user04_s21_29.png';
const profileFive =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user05_s21_29.png';
const profileSix =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user06_s21_29.png';
const profileSeven =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_msg_user07_s21_29.png';

const COLORS = ['deepskyblue', 'fuchsia', 'lightblue '];
const dataObjects1 = [
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
const dataObjects = [
  {
    id: 1,
    userId: 1,
    profile: {uri: profileOne},
    Soru: 'Hi, Emma Roberts. Nice to meet you.',
    currentMsg: false,
  },
  {
    id: 2,
    userId: 1,
    profile: {uri: profileOne},
    Soru: 'What are you planning to do today?',
    currentMsg: true,
  },
  {
    id: 3,
    userId: 2,
    profile: {uri: profileTwo},
    Soru: "I'm not sure yet.",
    currentMsg: true,
  },
  {
    id: 4,
    userId: 1,
    profile: {uri: profileOne},
    Soru: 'Would you like to have lunch with me?',
    currentMsg: true,
  },
  {
    id: 5,
    userId: 2,
    profile: {uri: profileTwo},
    Soru: 'Yes. When?',
    currentMsg: true,
  },
  {
    id: 6,
    userId: 1,
    profile: {uri: profileOne},
    Soru: 'Is 11:30AM OK?',
    currentMsg: true,
  },
  {
    id: 7,
    userId: 2,
    profile: {uri: profileTwo},
    Soru: "Sorry, I didn't hear you. Can you say that again please?",
    currentMsg: true,
  },
  {
    id: 8,
    userId: 1,
    profile: {uri: profileOne},
    Soru: 'I said, 11:30AM.',
    currentMsg: true,
  },
  {
    id: 9,
    userId: 2,
    profile: {uri: profileTwo},
    Soru: "Oh, I'm busy then. Can we meet a little later?",
    currentMsg: false,
  },
  {
    id: 10,
    userId: 2,
    profile: {uri: profileTwo},
    Soru: 'Are you free tomorrow?',
    currentMsg: true,
  },
];
let mIndex = 0;
class Chatty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selected: false,
      selectedItem: null,
      dataObject: [],
      currentText: '',
      matchUser: '',
      Unlem: false,
      Carpi: false,
      Yaziyor: false,
      ConversationId: '',
      index: 1,
      Sira: 1,
      Sorular: [],
      SoruId: null,
      party_answered: false,
      messages: [],
      androidAutoCorrectFix: true,
      CurrentMessage: null,
    };

    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ]);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  onMessage() {
    this.setState({currentText: ''});
    console.log('this.state.currentText:', this.state.currentText);
    let temporary = {};
    temporary.id = this.createGuid();
    temporary.userId = 1;
    temporary.uid = dataObjects.currentMsg === true ? 1 : 2;
    temporary.profile = {uri: profileTwo};
    this.state.currentText !== ''
      ? (temporary.Soru = this.state.currentText)
      : null;
    temporary.currentMsg = true;
    temporary.Sorumu = false;

    dataObjects.push(temporary);
    this.setState({dataObject: dataObjects});
    console.log('dataObject : ' + JSON.stringify(this.state.dataObject));
  }
  _closeKeyboard() {
    Keyboard.dismiss();
  }
  mesajtemplate = async data => {
    dataObjects.length = 0;
    let dta = [];
    dta = data;
    //console.log('item data==> ', data);
    dta.map((p, i) => {
      if (p.type === 'questionnaire') {
        //console.log('item ==> ', p, i++);
        let msg = {
          _id: this.createGuid(),
          text: 'Q' + this.state.Sira + '- ' + p.message,
          Sorumu: true,
          // system: true,
          // createdAt: new Date(),
          user: {
            _id: p.userId,
            name: this.props.Name,
            //avatar: this.props.profile_photo,
          },
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }));
        this.setState({Sira: this.state.Sira + 1});
      }
      if (p.type === 'user_answer') {
        let msg = {
          _id: this.createGuid(),
          text: p.message,
          Sorumu: false,
          // createdAt: new Date(),
          user: {
            _id: p.user_id === this.props.userId ? 2 : 1,
            name: this.props.Name,
            //avatar: this.props.profile_photo,
          },
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }));
      }
    });
  };
  onMessages = () => {
    try {
      //console.log('prtoperty: ', this.props);
      this.props.Ws.onmessage = e => {
        console.log('chat mesajı : ', e.data);

        if (JSON.parse(e.data).key === 'incoming_message') {
          let msg = {
            _id: this.createGuid(),
            text: JSON.parse(e.data).data.message,
            createdAt: new Date(),
            user: {
              _id: JSON.parse(e.data).data.user_id,
              name: this.state.matchUser,
              avatar: this.props.profile_photo,
            },
            //image: 'https://facebook.github.io/react/img/logo_og.png',
            // You can also add a video prop:
            // video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            // Any additional custom parameters are passed through
          };
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, msg),
          }));
          //#region
          /*
          let temporary = {};
          temporary.id = this.createGuid();
          temporary.userId = 1;
          temporary.uid = this.props.userId;
          temporary.profile = {uri: profileTwo};
          temporary.Soru = JSON.parse(e.data).data.message;
          temporary.currentMsg = false;
          temporary.Sorumu = false;

          dataObjects.push(temporary);
          this.setState({dataObject: dataObjects});
          */
        }
        if (JSON.parse(e.data).key === 'party_answered_question') {
          this.setState({party_answered: true});
          this.setState({Unlem: false});
          this.SorularCevaplar();
        }
        if (JSON.parse(e.data).key === 'typing_on') {
          console.log('typing on');
          this.setState({Yaziyor: true});
          this.setState({Unlem: false});
          this.setState({Carpi: false});

          this.setIsTyping();
        }
        if (JSON.parse(e.data).key === 'typing_off') {
          console.log('typing off');
          this.setState({Unlem: false});
          this.setState({Carpi: false});
          this.setState({Yaziyor: false});
        }
        if (JSON.parse(e.data).key === 'user_gone_offline') {
          console.log('user_gone_offline');
          this.setState({Carpi: true});
          this.setState({Yaziyor: false});
          this.setState({Unlem: false});
        }
        //#endregion
      };
    } catch (error) {}
  };
  renderAvatar(props) {
    return null;
  }
  onConversationInfo = async () => {
    console.log('conversationID::', this.props.ConversationID);
    let Id = '';
    if (this.props.navigation.state.params !== undefined) {
      Id = this.props.navigation.state.params.conversationId;
    } else {
      Id = this.props.ConversationID;
    }
    await setStorage('conversation_id', Id);
    await conversationInfo(Id).then(res => {
      if (res.status === true) {
        console.log('Conversation Info: ' + JSON.stringify(res));
        //console.log('Conversation Id:', res.request_body.conversation_id);
        this.setState({conversationId: res.request_body.conversation_id});
        //console.log('resim.data:', res.data);
        if (res.data.user.name !== undefined) {
          this.setState({matchUser: res.data.user.name});
        }
      }
    });
  };
  cevaplar = async () => {
    try {
      //this.setState({loading: true});
      let Id = '';
      if (this.props.navigation.state.params !== undefined) {
        console.log(
          'this.props.navigation.state.params.conversationId',
          this.props.navigation.state.params.conversationId,
        );
        Id = this.props.navigation.state.params.conversationId;
      } else {
        Id = this.props.ConversationID; // this.state.conversationID;
      }
      //console.log('userId 1', this.props.userId, Id);
      if (Id !== null) {
        await conversationMessage(Id).then(res => {
          /*console.log(
            'Sorular ve Cevaplar: ',
            res.data,
            ' length:',
            res.data.length - 1,
          );
*/
          this.mesajtemplate(res.data);
          this.setState({loading: false});
        });
      }
      await this.GetNextQuestion();
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
    }
  };
  GetNextQuestion = async () => {
    try {
      let msg = {};
      // this.setState({loading: true});
      await getNextQuestionId(this.props.ConversationID).then((p, i) => {
        // console.log('Chat getNextQuestion:=>', p.data.question);
        console.log('Chat getNex p:', p);
        this.setState({loading: false});
        if (p.status === true) {
          if (p.data.conversation_status === 'open') {
          } else if (
            p.data.question.type !== null ||
            p.data.question.type === 'one_of_many' ||
            p.data.question.type === 'true_false'
          ) {
            if (p.data.conversation_status === 'questionnaire') {
              let temporary = {};
              temporary.id = this.createGuid();
              temporary.userId = p.data.question.question_id;
              temporary.uid = this.props.userId;
              temporary.Soru = p.data.question.content;

              temporary.currentMsg = true;
              temporary.Sorumu = true;
              temporary.Type = 'question';
              // this.soruMessages(p.data);

              //dataObjects.push(temporary);
              // this.setState({Sorular: dataObjects});

              var myInd = 0;
              if (p.data.question.options !== null) {
                p.data.question.options.map((item, index) => {
                  myInd = index;
                  // console.log('item options: ', item, index);
                  msg = {
                    _id: item.value,
                    text:
                      item.label !== null
                        ? item.label.toUpperCase() + '- ' + item.content
                        : item.content,
                    Sorumu: false,
                    Options: true,
                    ButtonKoy: index === true,
                    // system: true,
                    // createdAt: new Date(),
                    user: {
                      _id: this.props.userId,
                      name: this.props.Name,
                      //avatar: this.props.profile_photo,
                    },
                  };
                  this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, msg),
                  }));
                });
                // console.log('myIndex: ', myInd);
                msg = {
                  _id: this.createGuid(),
                  text: 'Button',
                  ButtonKoy: true,
                  user: {
                    _id: this.props.userId,
                    name: this.props.Name,
                  },
                };
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, msg),
                }));
              }
            }
          }
        } /*else {
          Alert.alert(
            'Hata Oluştı',
            p.error_code,
            [{text: 'Tamam', onPress: () => ''}],
            {
              cancelable: true,
            },
          );
        }*/
      });
      // console.log('this.state.Sorular: ', this.state.Sorular, this.state);
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
    }
  };
  sendCevap = async () => {
    try {
      let Indx = 0;
      if (this.state.SoruId !== null) {
        await sendAnswer(this.state.SoruId, this.state.selectedItem).then(
          res => {
            console.log('Cevap: ', JSON.stringify(res));
            this.setState({Num: 0});
            this.setState({loading: false});
            this.setState({Unlem: true});
            this.cevaplar();
            this.GetNextQuestion();
          },
        );
      }
      console.log('this.state.party_answered', this.state.party_answered);
    } catch (error) {
      Alert.alert('Error', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };

  componentDidMount = async () => {
    moment.locale('tr');
    console.log('property():', this.props);
    this.onMessages();
    this.setState({matchUser: this.props.Name});
    this.setState({index: 1});

    await this.onConversationInfo();
    await this.cevaplar();
    //this.GetNextQuestion();
    /* this.onMessages();
    await this.onConversationInfo();
    await this.cevaplar();
    */
  };

  _onPress = item => {
    mIndex = 1;
    // console.log('item degeri : ', item, item.question_id);
    this.setState({selected: true});

    if (this.state.selectedItem !== item.id) {
      this.setState({Secilen1: item.value});
    }
    this.setState({selectedItem: item.id});
    this.setState({SoruId: item.question_id});
  };
  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.Yaziyor,
    });
  };
  renderAccessory = () => (
    <AccessoryBar onSend={this.onSendmsg} isTyping={this.setIsTyping} />
  );
  renderMessageText = props => {
    const {currentMessage} = props;
    const {text: currText} = currentMessage;
    //console.log('currText.indexOf():', currText.indexOf('Q'));

    return <CustomMessageText {...props} />;
  };
  renderBubbleText = props => {
    const {
      currentMessage: {text: currText},
    } = props;
    return <RenderBubble {...props} />;
  };
  /*
  soruMessages = message => {
    console.log('soruMessages():', message);
    let msg = {
      _id: message.question.question_id,
      text: 'Q' + message.question.step + '-' + message.question.content,
      // createdAt: new Date(),
      user: {
        _id: 2,
        name: message.conversation_status,
        avatar: message.conversation_status === 'questionnaire' ? null : null,
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, msg),
    }));
    message.question.options.map((p, i) => {
      msg = {
        _id: p.value,
        text: p.label !== null ? p.label + '' + p.content : p.content,
        // createdAt: new Date(),
        user: {
          _id: 1,
          name: message.conversation_status,
          avatar: message.conversation_status === 'questionnaire' ? null : null,
        },
      };
      this.setState(previousState => ({
       // messages: GiftedChat.append(previousState.messages, msg),
      }));
    });
  };
  */
  onSendmsg(messages = []) {
    console.log('messages: ', messages);

    const msg = {
      _id: this.createGuid(),
      text: messages.text.trim(),
      createdAt: new Date(),
      user: {
        _id: 1,
        name: this.props.userName,
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      },
      // image: 'https://facebook.github.io/react/img/logo_og.png',

      //video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, msg, true),
    }));

    // messages.onSend({text: messages.text.trim()}, true);
    messages.currentMessage = '';
    console.log('mesaj: ', messages[0].text);
    this.sendChatMessage(messages[0].text);

    // Keyboard.dismiss();
  }
  //Kulanıcıya Mesajı Yolla
  sendChatMessage = msg => {
    try {
      let info = JSON.stringify({
        action: 'chat_message',
        data: {
          room_id: this.state.conversationID,
          message: msg,
        },
      });
      SendMessage(info);
    } catch (error) {
      console.log('sendMessage: ' + error);
    }
  };
  optionRender = (item, index) => {
    //console.log('mitem: ', item, this.state.Sorular.length);

    //console.log('mIndex: ', index);
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
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
            onPress={() => this._onPress(item)}
            style={
              this.state.selectedItem === item.id ||
              this.state.Secilen1 === item.id
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
                this.state.selectedItem === item.id
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
              {item.label !== null ? item.label.toUpperCase() : item.label}-{' '}
              {item.Soru}
            </Text>
            <Right>
              {
                // <Icon name="arrow-forward" />
              }
            </Right>
          </CardItem>
        </Card>
        <View>
          {index === this.state.Sorular.length - 1 ? (
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
          ) : null}
        </View>
      </View>
    );
  };
  _renderRow(rowData, i, k) {
    //console.log('rowData: ', rowData, 'rData: ', k);
    return (
      <View style={personal.rowMain}>
        {rowData.bigSira ? (
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginBottom: 5,
            }}
          />
        ) : null}
        {rowData.NextQuestion !== true ? (
          rowData.Sorumu === true ? (
            <View
              style={[
                personal.SoruMain,
                rowData.currentMsg
                  ? {marginBottom: height * 0.016, marginTop: 1.5}
                  : {marginVertical: 1.5},
              ]}>
              <LinearGradient
                locations={[0.1, 0.75]}
                colors={['#fff', '#fffa']}
                style={personal.rightChatBox}>
                <Text
                  style={{
                    color: '#e53935',
                    fontFamily: 'Raleway-Regular',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}>
                  Q{rowData.Sira}:{' '}
                  <Text
                    style={{
                      color: '#424242',
                      fontWeight: 'normal',
                      fontFamily: 'Raleway-Regular',
                      fontSize: 13,
                    }}>
                    {rowData.Soru}
                  </Text>
                </Text>
              </LinearGradient>
            </View>
          ) : rowData.currentMsg ? (
            <View
              style={[
                personal.rightChatMain,
                rowData.currentMsg
                  ? {marginBottom: height * 0.016, marginTop: 1.5}
                  : {marginVertical: 1.5},
              ]}>
              <LinearGradient
                locations={[0.1, 0.75]}
                colors={['#1274c1', '#116cb3']}
                style={personal.rightChatBox}>
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    fontFamily: 'Raleway-Regular',
                    fontSize: 13,
                  }}>
                  {rowData.Soru}
                </Text>
              </LinearGradient>
              {rowData.currentMsg === true ? (
                <View style={personal.rightIndicatorMain}>
                  <Image
                    source={Images.rightChatIndicator}
                    style={personal.rightIndicator}
                  />
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
                  <Image
                    source={Images.leftChatIndicator}
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
                <Text
                  style={{
                    color: '#424242',
                    fontWeight: 'normal',
                    fontFamily: 'Raleway-Regular',
                    fontSize: 13,
                  }}>
                  {rowData.Soru}
                </Text>
              </View>
            </View>
          )
        ) : (
          this.optionRender(rowData, k)
        )}
      </View>
    );
  }
  renderFooter = props => {
    //console.log('Yazıyorrrr...', this.state.Yaziyor);
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      );
    }
    if (this.state.Yaziyor) {
      return (
        <View>
          <Text>Yazıyor...</Text>
        </View>
      );
    }
    return null;
  };
  renderComposer = props => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => alert('picture')}>
          <Icon
            type="SimpleLineIcons"
            name="camera"
            style={{
              fontSize: 20,
              justifyContent: 'center',
              paddingTop: 10,
              paddingLeft: 5,
            }}
          />
        </TouchableOpacity>

        <Composer {...props} />
        <TouchableOpacity onPress={() => this.onSendmsg(props)}>
          <Text
            style={{
              justifyContent: 'center',
              paddingTop: 10,
              color: '#f53c76',
              fontFamily: 'Raleway-Bold',
              fontSize: 18,
              paddingRight: 10,
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  onLongPress = (context, message) => {
    console.log('context- message:', context, message);
    const options = ['Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
  };

  prenderBubble = props => {
    var SecilmisOlan = null;
    console.log('Secim: ', props);
    this.props = props;
    // console.log('systen: ', props);
    //const [Secili, SetSecili] = useState(null);
    const {
      currentMessage: {text: currText},
    } = props;

    if (props.currentMessage.system) {
      return (
        <View>
          <View style={{alignSelf: 'center', marginLeft: 10}}>
            <Text style={{color: '#fff', textAlign: 'center', marginLeft: 10}}>
              {props.currentMessage.text}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <Bubble
        {...props}
        onLongPress={() =>
          this.setState({CurrentMessage: props.currentMessage._id, props})
        }
        textStyle={{
          color: '#f53c76',
          right: {
            textAlign: 'left',
            fontFamily: 'Raleway-Medium',
            fontSize: 10,
            color: props.currentMessage.Sorumu ? '#f53c76' : '#fff',
          },
          left: {
            textAlign: 'left',
            fontFamily: 'Raleway-Medium',
            fontSize: 10,
            color: props.currentMessage.Options ? '#fff' : '#000',
          },
        }}
        wrapperStyle={{
          left: {
            width: props.currentMessage.Options ? 270 : null,
            marginVertical:
              props.currentMessage.Sorumu || props.currentMessage.Options
                ? 5
                : 0,
            borderRadius: 5,
            alignSelf:
              props.currentMessage.Sorumu || props.currentMessage.Options
                ? 'center'
                : props.currentMessage.ButtonKoy
                ? 'center'
                : 'baseline',
            backgroundColor:
              props.currentMessage.Sorumu || props.currentMessage.ButtonKoy
                ? 'transparent'
                : props.currentMessage.Options
                ? '#fff'
                : this.state.CurrentMessage !== null
                ? '#116cb3'
                : '#fff',
          },
          right: {
            borderRadius: 5,
            backgroundColor: '#116cb3',
          },
        }}
        timeTextStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  render() {
    return (
      <Container style={{backgroundColor: '#f5f5f5'}}>
        {headerRenkli(
          this.state.matchUser + ' & Sen',
          'SearchMain',
          this.props,
          '#f5326f',
        )}

        <View style={{backgroundColor: 'transparent', height: 70}}>
          {TalkHeader(check, check, check, check, check)}
        </View>
        {spinner(this.state.loading)}
        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          <GiftedChat
            renderLoading={() => (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            locale={'tr-tr'}
            //isTyping
            //loadEarlier
            onPressAvatar={this.onLongPress}
            //onPress={this.onLongPress}
            //onLongPress={this.onLongPress}
            renderAvatar={this.renderAvatar}
            showUserAvatar
            renderFooter={this.renderFooter}
            renderComposer={messages => this.renderComposer(messages)}
            messages={this.state.messages}
            //renderAccessory={this.renderAccessory}
            renderMessageText={this.renderMessageText}
            renderBubble={this.renderBubbleText}
            onSend={messages => this.onSendmsg(messages)}
            shouldUpdateMessage={(props, nextProps) => {
              return props.currentMessage !== nextProps.currentMessage
                ? (props.currentMessage, nextProps.currentMessage)
                : null;
            }}
            user={{
              _id: 1, //this.props.UserId,
            }}
          />
          {Platform.OS === 'android' && (
            <KeyboardAvoidingView behavior="padding" />
          )}
        </View>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  userName: state.userReducers.username,
  userId: state.userReducers.userId,
  emailId: state.userReducers.email,
  tokenId: state.userReducers.token,
  gender: state.userReducers.gender,
  role: state.userReducers.role,
  Ws: state.SockReducer.WS,
  MatchID: state.SockReducer.Match,
  Name: state.matchReducer.Name,
  matchId: state.matchReducer.Match_Id,
  UserId: state.matchReducer.UserId,
  Gender: state.matchReducer.Gender,
  profile_photo: state.matchReducer.profile_photo,
  Country: state.matchReducer.Country,
  City: state.matchReducer.City,
  Locale: state.matchReducer.locale,
  Distance: state.matchReducer.distance,
  ConversationID: state.matchReducer.ConversationID,
});

export default connect(mapStateToProps)(Chatty);
/*
 <KeyboardAvoidingView behavior="padding">
            <Content style={styles.content}>
              {
                //console.log('dobject: ', this.state.dataObject)
              }
              <List
                dataArray={this.state.dataObject}
                renderRow={(p, i, rowID) => this._renderRow(p, i, rowID)}
              />
            </Content>
          </KeyboardAvoidingView>

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
                  onChangeText={value => this.setState({currentText: value})}
                  value={this.state.currentText}
                  underlineColorAndroid="transparent"
                />
              </Item>
            </View>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.onMessage(this)}>
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

*/
