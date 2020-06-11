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
} from 'native-base';

import Video from 'react-native-video';
import styles from '../styles/styles';
import {header, headerRenkli} from '../Component/header';
import {spinner} from '../Component/spinner';
import {
  TalkHeader,
  buttonOnPressWithWidth,
  buttonPressWithWidth,
  GrafikSoru,
  VideoSoru,
} from '../Component/button';
import {
  getStorage,
  setStorage,
  getNextQuestion,
  sendAnswer,
} from '../service/service'; //Servis Çağrıları
import {Soru} from '../Component/Sorular';

import {connect} from 'react-redux';

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
var secilenler = [];
var secim1 = '';
var secim2 = '';
class Talk1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selected: false,
      selectedItem: null,
      soruTipi: 0,
      rate: 3,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      matchUser: '',
      dsSorular: [],
      Soru: '',
      SoruId: '',
      Step: 1,
      Num: 0,
      Secilen1: '',
      Secilen2: '',
    };
  }

  getOnlineUser = async () => {
    const actionData = await getStorage('matchData');
    console.log('Talk1::', actionData);
    console.log('This.props::', this.props);
    let user = JSON.parse(actionData).data.user.name;
    this.setState({matchUser: user});
  };
  componentDidMount = async () => {
    this.getOnlineUser();
    this.sorulariAl();
  };
  sorulariAl = async () => {
    try {
     // this.setState({loading: true});
      const room_id = await getStorage('conversation_id');
      const Conv = await getStorage('conversationInfo');
      console.log('Conv::', Conv);
      if (room_id !== '') {
        getNextQuestion(room_id).then(res => {
          console.log('sorular: ', JSON.stringify(res));
          if (res.status === true) {
            if (res.data.conversation_status === 'questionnaire') {
              this.setState({dsSorular: res.data.question.options});
              this.setState({Soru: res.data.question.content});
              this.setState({SoruId: res.data.question.question_id});
              this.setState({loading: false});
              this.setState({Step: res.data.question.step});
            } //open
            else if (res.data.conversation_status === 'open') {
              this.setState({loading: false});
              this.props.navigation.push('Chat');
            }
          } else {
            this.setState({loading: false});
            Alert.alert(
              'Question Error',
              res.error_message,
              [{text: 'Tamam', onPress: () => ''}],
              {
                cancelable: true,
              },
            );
          }
        });
      }
    } catch (error) {
      Alert.alert('Error', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  onBuffer = () => {
    return true;
  };
  _onPress = (item, index) => {
    console.log('itemid: ', item.value);
    this.setState({selected: true});
    this.setState({selectedItem: item.value});
    if (this.state.selectedItem !== item.value) {
      this.setState({Secilen1: item.value});
    }

    if (secilenler.length < 2) {
      secilenler.push(item.value);
      secilenler.forEach(e => {
        console.log('foreach:', e);
      });
    }
    /*
    alert(
      JSON.stringify(item) +
        '---' +
        this.state.selectedItem +
        ' -- ' +
        this.state.Secilen1 +
        ' --- ' +
        secilenler.length,
    );
    */
  };
  sendCevap = () => {
    try {
      // console.log('Send Cevap');
      this.setState({loading: true});
      if (this.state.SoruId !== null) {
        sendAnswer(this.state.SoruId, this.state.selectedItem).then(res => {
          console.log('Cevap: ', JSON.stringify(res));
          this.setState({Num: 0});
          this.setState({loading: false});
          this.sorulariAl();
        });
      }
    } catch (error) {
      Alert.alert('Error', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  _Soru = () => {
    if (this.state.soruTipi === 0) {
      return (
        <View>
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
              Q{this.state.Step}:
              <Text
                style={{
                  color: '#424242',
                  fontWeight: 'normal',
                  fontFamily: 'Raleway-Regular',
                }}>
                {' '}
                {this.state.Soru}
              </Text>
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <FlatList
              numColumns={1}
              extraData={this.state.selectedItem}
              data={this.state.dsSorular} //{DATA}
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
                                fontSize: 14,
                                color: '#fff',
                                alignSelf: 'center',
                              }
                            : {
                                fontFamily: 'Raleway-Regular',
                                textAlign: 'center',
                                fontSize: 14,
                                alignSelf: 'center',
                              }
                        }>
                        {item.label} - {item.content}
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
              keyExtractor={item => item.value}
            />
          </View>
          <View style={{backgroundColor: 'transparent'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                padding: 10,
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
        </View>
      );
    } else if (this.state.soruTipi === 1) {
      return (
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {GrafikSoru('Chat()', sendbuton)}
        </View>
      );
    }
    if (this.state.soruTipi === 2) {
      return (
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {VideoSoru('Chat', sendbuton, this)}
        </View>
      );
    }
  };
  headerDuzenle = () => {
    try {
      //console.log('Stepp: ', this.state.Step);
      switch (this.state.Step) {
        case 1:
          return TalkHeader(check, iki, bosyuvarlak3, dort, bes);
        //break;
        case 2:
          return TalkHeader(check, check, bosyuvarlak3, dort, bes);
        // break;
        case 3:
          return TalkHeader(check, check, check, dort, bes);
        // break;
        case 4:
          return TalkHeader(check, check, check, check, bes);
        //break;
        case 5:
          return TalkHeader(check, check, check, check, check);
        //break;

        default:
          console.log('default');
          return TalkHeader(check, iki, bosyuvarlak3, dort, bes);
      }
    } catch (error) {}
  };
  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <View>
          {headerRenkli(
            this.state.matchUser + ' & Sen',
            'Chat',
            this.props,
            '#f5326f',
          )}
        </View>
        {spinner(this.state.loading)}
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          {this.headerDuzenle() //if (this.state.Step===1) TalkHeader(check, iki, bosyuvarlak3, dort, bes)
          }
        </View>
        <View
          style={{
            flex: 7,
            backgroundColor: 'transparent',
          }}>
          {this._Soru()}
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
  Match: state.SockReducer.Match,
});
export default connect(mapStateToProps)(Talk1);
