/* eslint-disable no-bitwise */
/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import {View, Image, TouchableOpacity, Alert, FlatList} from 'react-native';

import {
  Container,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Tab,
  Tabs,
  TabHeading,
  Badge,
  Card,
  CardItem,
  Button,
  List,
  ListItem,
} from 'native-base';

import personal from '../styles/PersonalChatStyles';
import {headerRenkli} from '../Component/header';
import {spinner} from '../Component/spinner';

import {messageList, roomList} from '../service/service';
import {connect} from 'react-redux';
import moment from 'moment';
const message = require('../assets/mesaj/message.png');

const profile =
  'http://antiqueruby.aliansoftware.net//Images/social/ic_msg_user01_s21_29.png';
const profileTwo =
  'http://antiqueruby.aliansoftware.net//Images/social/ic_msg_user02_s21_29.png';
const bosProfil = 'https://cdn.fogotalk.com/d/default_avatar_m.jpg';
let dataObjects = [
  {
    id: 1,
    userId: 1,
    profile: {uri: profile},
    name: '',
    message: '',
    currentMsg: false,
    Time: 'Today',
    seen: false,
  },
];
let Sablon = {
  id: '',
  userId: 2,
  name: '',
  profile: {uri: profileTwo},
  message: '',
  currentMsg: false,
  Time: 'Last Week',
  seen: false,
  ws: null,
  toplam: 0,
};
class Mesajlar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeRowKey: null,
      deletedRowKey: null,
      listType: 'FlatList',
      listViewData: dataObjects,
      data: [],
    };
    // moment.locale('tr');
  }
  componentDidMount = async () => {
    await this.RoomList();
  };
  CreateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  RoomList = async () => {
    try {
      dataObjects = [];
      var datalar = [];
      this.setState({loading: true});
      await roomList().then(res => {
        this.setState({loading: false});
        console.log('Room Listesi: ', res);
        datalar = res;
        //alert(JSON.stringify(res));
        console.log('Room Listesi: ', res);
        if (datalar !== null) {
          if (datalar.status === true) {
            datalar.data.map(p => {
              if (p.status !== 'initial_questionnaire') {
                let guid = this.CreateGuid();
                Sablon = {};
                Sablon.id = guid;
                Sablon.userId = p.user.id;
                Sablon.name = p.user.name;
                Sablon.message = p.last_message.message;
                Sablon.currentMsg = false;
                Sablon.seen = p.last_message.seen;
                Sablon.conversationId = p.conversation_id;
                p.user.photo === null
                  ? (Sablon.profile = {uri: bosProfil})
                  : (Sablon.profile = {uri: p.user.photo});

                /* console.log(
                'Day Ago: ',
                moment(p.last_message.timestamp * 1000).fromNow(),
              );
              */
                switch (moment(p.last_message.timestamp * 1000).fromNow()) {
                  case 'a month ago':
                    Sablon.Time = '1 Ay Önce';
                    break;
                  case 'a day ago':
                    Sablon.Time = '1 Gün Önce';
                    break;
                  default:
                    Sablon.Time = moment(p.last_message.timestamp * 1000)
                      .fromNow()
                      .replace('days ago', 'Gün Önce');
                    break;
                }
                dataObjects.push(Sablon);
                //this.mesajListesi(p.id);
              }
            });
          }
        }
      });
      this.setState({toplam: dataObjects.length});
      console.log('dataObjects: ', dataObjects);
      /* if (this.state.data.length !== 0) {
        console.log('data: ', this.state.data);
        let DistinctData = [
          ...new Set(this.state.data.map(i => i.user_id === p.id)),
        ];
        console.log('sonuclar: ', DistinctData);
      }
      */
    } catch (error) {
      this.setState({loading: false});
      Alert.alert('Hata', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  mesajListesi = async roomId => {
    try {
      //const roomId = await getStorage('room_id');
      if (roomId !== null) {
        await messageList(roomId).then(res => {
          this.setState({data: res.data});
          //console.log('data res: ', this.state.data)
          const distinctData = [...new Set(res.data.map(x => x.user_id))];
          console.log('ditnct: ', distinctData);
          if (res.status === true) {
            console.log('Messages Raw: ', res);
            const uniqueTags = [];
            res.data.map(i => {
              if (uniqueTags.indexOf(i.user_id) === -1) {
                uniqueTags.push(i.user_id);
              }
            });
            console.log('Messagess: ', uniqueTags);
          }
        });
      }
    } catch (error) {
      this.setState({loading: false});
      Alert.alert('Hata', error, [{text: 'Tamam', onPress: () => ''}], {
        cancelable: true,
      });
    }
  };
  renderZamanTab = item => {
    return (
      <View>
        <Card
          style={{
            marginTop: -5,
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: 'lightgray',
          }}>
          <CardItem cardBody>{this.renderRow(item)}</CardItem>
        </Card>
      </View>
    );
  };

  renderMesajTab = item => {
    return (
      <View>
        <Card
          style={{
            marginTop: -5,
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: 'lightgray',
          }}>
          <CardItem cardBody>{this.renderRow(item)}</CardItem>
        </Card>
      </View>
    );
  };
  takeId = (item, name) => {
    console.log('Name: ', name);
    this.props.navigation.navigate('Chat', {
      conversationId: item,
      Name: name,
      Msg: true,
    });
  };
  renderRow = item => {
    //console.log('itenrow: ', item, '   -Name:', JSON.parse(item).name);
    return (
      <View style={{flex: 1, backgroundColor: 'transparent', marginTop: 5}}>
        <List
          renderLeftHiddenRow={data => (
            <Button full onPress={() => alert(data)}>
              <Icon active name="information-circle" />
            </Button>
          )}
          renderRightHiddenRow={(item, secId, rowId, rowMap) => (
            <Button
              full
              danger
              onPress={() => this.deleteRow(secId, rowId, rowMap)}>
              <Icon active name="trash" />
            </Button>
          )}>
          <ListItem>
            <Left style={{backgroundColor: 'transparent', marginLeft: 0}}>
              <Image
                source={JSON.parse(item).profile}
                style={personal.profile}
              />
            </Left>
            <Body style={{marginLeft: -200, backgroundColor: 'transparent'}}>
              <TouchableOpacity
                onPress={() =>
                  this.takeId(
                    JSON.parse(item).conversationId,
                    JSON.parse(item).name,
                  )
                }>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Raleway-Bold',
                    textAlign: 'left',
                    color: 'black',
                  }}>
                  {JSON.parse(item).name}
                  {'\n'}
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Raleway-Thin',
                      textAlign: 'left',
                      color: '#5c4851',
                    }}>
                    {JSON.parse(item).message}
                  </Text>
                </Text>
              </TouchableOpacity>
            </Body>
            <Right>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Raleway-Bold',
                  textAlign: 'center',
                  color: 'red',
                }}>
                {JSON.parse(item).Time}
              </Text>
            </Right>
          </ListItem>
        </List>
      </View>
    );
  };
  renderList = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          // flexDirection: 'column-reverse',
        }}>
        <FlatList
          numColumns={1}
          data={dataObjects}
          scrollToEnd={true}
          renderItem={({item}) => this.renderMesajTab(JSON.stringify(item))}
          renderRightHiddenRow={(data, secId, rowId, rowMap) => (
            <Button
              full
              danger
              onPress={() => this.deleteRow(secId, rowId, rowMap)}>
              <Icon active name="trash" />
            </Button>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  };
  renderListMesaj = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          // flexDirection: 'column-reverse',
        }}>
        <FlatList
          numColumns={1}
          data={dataObjects}
          scrollToEnd={true}
          renderItem={({item}) => this.renderZamanTab(item)}
          renderRightHiddenRow={(data, secId, rowId, rowMap) => (
            <Button
              full
              danger
              onPress={() => this.deleteRow(secId, rowId, rowMap)}>
              <Icon active name="trash" />
            </Button>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  renderTab = () => {
    return (
      <Tabs tabBarUnderlineStyle={{backgroundColor: 'red'}}>
        <Tab
          underlineStyle={{color: 'red'}}
          heading={
            <TabHeading
              underlineStyle={{color: 'red'}}
              style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
              <Image
                source={message}
                style={{
                  width: 30,
                  resizeMode: 'contain',
                  alignSelf: 'flex-start',
                  //marginLeft: -300,
                }}
              />
              <Badge style={{marginLeft: 5, marginTop: 10}}>
                <Text style={{fontFamily: 'Raleway-Light', fontSize: 10}}>
                  {this.state.toplam}
                </Text>
              </Badge>
            </TabHeading>
          }>
          <View>{this.renderList()}</View>
        </Tab>
      </Tabs>
    );
  };
  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        {headerRenkli('Mesajlar', 'SearchMain', this.props, '#f5326f')}
        {spinner(this.state.loading)}
        {this.renderTab()}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userName: state.auth.username,
  userId: state.auth.uid,
  emailId: state.profile.email,
  gender: state.profile.gender,
  role: state.auth.role,
});

export default connect(mapStateToProps)(Mesajlar);
