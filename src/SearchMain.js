/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Container, Text, Button, Badge} from 'native-base';
import {setStorage} from '../service/service';
import styles from '../styles/styles';
import {spinner} from '../Component/spinner';
import {connect} from 'react-redux';
import {Connect} from '../Component/client';
import logo from '../assets/logo.png';
import screenBg from '../assets/Searchekran/background.png';
import gorsel from '../assets/Searchekran/gorsel.png';
import adam from '../assets/Searchekran/adam.png';
import yuvarlak from '../assets/Searchekran/yuvarlak.png';
import mesajbtn from '../assets/Searchekran/mesaj.png';
import arrowbtn from '../assets/Searchekran/arrowbtn.png';
import kirmiziButton from '../assets/kbuton.png';
import kumsaati from '../assets/Searchekran/kumsaati.png';

let ws = null;
class SearchMain extends Component {
  constructor(props) {
    super(props);
    //this.ws = bindMessage();
    //this.message = this.ws.onmessage.bind();
    this.state = {
      loading: false,
      myTextContentType: true,
      dataState: null,
    };
  }

  componentDidMount = async () => {
   // await setStorage('token', '');
    // ReceiveMessage()
    console.log('Search Main Props: ', this.props);
    console.log('Search Main Ws: ', this.props.Ws);
    //Alert.alert(JSON.stringify(this.props));
  };
  onKey = async () => {
    this.props.navigation.push('SohbetBaslat');
    /*
    this.setState({loading: true});
    await MatchUser();
    setTimeout(() => {
      this.setState({loading: false});
      this.props.navigation.push('SohbetBaslat');
    }, 7000);
*/
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
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}>
            <Text
              style={{
                color: '#fb356f',
                fontSize: 16,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              Farklı Bir Sohbet {'\n'}Deneyimine Hazırsan{'\n'}
              <Text
                style={{
                  color: '#fb356f',
                  fontSize: 16,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                Başla
              </Text>
            </Text>
            <Image
              style={{width: 30, resizeMode: 'contain', alignSelf: 'center'}}
              source={arrowbtn}
            />
          </View>
          <View
            style={{
              flex: 1.8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.push('profile')}>
                <View>
                  <Image
                    style={{width: 50, resizeMode: 'contain'}}
                    source={adam}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Button
                badge
                vertical
                transparent
                onPress={() => this.props.navigation.push('profile')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginRight: 20,
                    marginLeft: 10,
                    marginTop: -10,
                    marginVertical: -20,
                  }}
                  source={adam}
                />
                <Badge
                  style={{marginLeft: 45, marginTop: -35, marginBottom: 0}}>
                  <Text>2</Text>
                </Badge>
                <Text />
              </Button>
            </View>
            <View>
              <TouchableOpacity
                onPress={
                  () => {
                    this.onKey();
                  } //('SearchMainAsamaBir')
                }>
                <View style={{marginLeft: 0, marginRight: 5}}>
                  <Image
                    style={{
                      marginLeft: 0,
                      width: 60,
                      height: 60,
                      resizeMode: 'contain',
                    }}
                    source={yuvarlak}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Button
                badge
                vertical
                transparent
                onPress={() => this.props.navigation.navigate('Mesajlar')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginRight: 20,
                    marginLeft: 10,
                    marginTop: -10,
                    marginVertical: -20,
                  }}
                  source={mesajbtn}
                />
                <Badge
                  style={{marginLeft: 45, marginTop: -35, marginBottom: 0}}>
                  <Text>2</Text>
                </Badge>
                <Text></Text>
              </Button>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.push('Mesajlar')}>
                <View>
                  <Image
                    style={{width: 50, resizeMode: 'contain'}}
                    source={adam}
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
  username: state.auth.username,
  uid: state.auth.uid,
  //emailId: state.userReducers.email,
  //tokenId: state.userReducers.token,
  //gender: state.userReducers.gender,
  //role: state.userReducers.role,
  //Name: state.matchReducer.Name,
  Ws: state.sock.WS,
});

export default connect(mapStateToProps)(SearchMain);
