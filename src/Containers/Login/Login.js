/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import { View, StatusBar, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Text, Input, Item, Content, Container } from 'native-base';
import {Connect} from '../../../Component/client';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from '@react-native-community/google-signin';
//import appleAuth, { AppleButton, AppleAuthRequestScope, AppleAuthRequestOperation } from '@invertase/react-native-apple-authentication';
import {BallIndicator} from 'react-native-indicators';
import config from './../../config';
import styles from '../../../styles/styles';
import {header} from '../../../Component/header';
import {button} from '../../../Component/button';
import {logoveYazi} from '../../../Component/logoveYazi';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import logo from '../../../assets/logo.png';
import screenBg from '../../../assets/griarkaplan.png';
import goz from '../../../assets/goz.png';
import button1 from '../../../assets/kbuton.png';
import google from '../../../assets/gButon.png';
import facebook from '../../../assets/fButton.png';
import {login} from './../../redux/actions/authA';
import {getProfile} from './../../redux/actions/profileA';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      showPlainPassword: true,
      userInfo: null,
      ws: null,
      messages: [],
      // userId: null,
      // isReady: false,
      // userInfo: null,
      error: null,
    };
    this.getUserId = this.getUserId.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount = async () => {
    // console.log('componentDidMount() props=>', this.props);
    const subscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    //console.log('Props: ', this.props);
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  };

  componentDidUpdate = (prevProps, prevState) => {
    ///console.log('componentDidUpdate() props=>', this.props);
    // if (prevProps.Name !== this.props.Name) {
    //   this.setState({matchUser: this.props.Name});
    //   console.log('componentDidUpdate() props=>', this.props);
    //   console.log('prevProps:', prevProps);
    // }
  };

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  }
  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo, error: null});
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED
          ? 'Please sign in :)'
          : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  getUserId(data) {
    const {userId} = data;

    this.setState({userId});
  }

  start() {
    const {username} = this.state;
    if (username && username.length > 3) {
      this.setState({isReady: true});
    } else {
      alert('Username is min 4 characters');
    }
  }

  googleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  };

  onLogin = () => {
    this.props.login(this.state.username, this.state.password)
      .then((res2) => {
        console.log('LOGIN',res2);
        this.props.getProfile().then((res) => {
          console.log('PROF',res);
          //Connect();
          this.props.navigation.navigate('SearchMain');
        });
      });
  };

  signInGoogle = async () => {
    try {
      var hasplay = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Something went wrong', userInfo, hasplay);
      this.setState({userInfo, error: null});
      await this.googleSign();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  googleSign = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      //Alert.alert(String(isSignedIn));

      const userInfo = await GoogleSignin.getCurrentUser();
      Alert.alert(
        'current user',
        userInfo ? JSON.stringify(userInfo.user) : 'null',
      );
      const isToken = await GoogleSignin.getTokens();
      Alert.alert('tokens', JSON.stringify(isToken));
    } catch (error) {}
  };

  renderIsSignedIn() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.signInGoogle()}>
          <View>
            <Image
              source={google}
              style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}}
            />
            <Text
              style={{
                color: '#518ef8',
                marginTop: -85,
                fontSize: 16,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {' '}
              GOOGLE İLE BAĞLAN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    return (
      <Container style={styles.container}>
        {header('', 'landing', this.props)}
        <ImageBackground source={screenBg} style={styles.imageContainer}>
          <Content
            style={{
              flex: 11,
              backgroundColor: 'transparent',
              flexDirection: 'column',
              marginVertical: 5,
            }}>
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
              <Item regular style={styles.Item}>
                <Input
                  style={{color: 'black', marginLeft: 10}}
                  editable={true}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="E-Posta"
                  keyboardType="email-address"
                  placeholderTextColor="#808080"
                  onChangeText={value => this.setState({username: value})}
                  value={this.state.username}
                  underlineColorAndroid="transparent"
                />
              </Item>
              <Item regular style={styles.Item}>
                <Input
                  style={{marginLeft: 10}}
                  placeholder="Şifre"
                  secureTextEntry={this.state.showPlainPassword}
                  textContentType="password"
                  placeholderTextColor="#808080"
                  onChangeText={value => this.setState({password: value})}
                  value={this.state.password}
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                  onPress={() => this.setState({showPlainPassword: !this.state.showPlainPassword})}>
                  <Image
                    style={{width: 30, height: 10, marginRight: 20}}
                    source={goz}
                  />
                </TouchableOpacity>
              </Item>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <Text style={{color: '#fd4e4e', fontSize: 13}}>
                  {' '}{this.props.errorMessage}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: 'transparent',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                disabled={this.props.isProcessing}
                onPress={() =>
                  this.onLogin()
                }>
                <Image
                  source={button1}
                  style={{
                    width: '85%',
                    height: 63,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}
                />
                <View style={[styles.absoluteView, {flex: 1, flexDirection: 'row'}]}>
                {this.props.isProcessing ? (
                  <BallIndicator color="white" size={25} />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    SIGN IN
                  </Text>
                )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.sendMessage()}>
                <View style={styles.SfiremiUnuttum}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                      fontWeight: 'normal',
                    }}>
                    {' '}
                    Forgot Password
                  </Text>
                </View>
              </TouchableOpacity>
              {button(
                'FACEBOOK İLE BAĞLAN',
                'landing',
                this.props,
                facebook,
                'white',
              )}
              {this.renderIsSignedIn()}
            </View>
          </Content>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'column-reverse',
              marginBottom: 20,
            }}>
            {logoveYazi(
              'Already have an account? ',
              'Profile',
              this.props,
              logo,
              'SIGN IN',
            )}
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isProcessing: state.auth.isProcessing,
  hasError: state.auth.hasError,
  errorMessage: state.auth.errorMessage,
  // tokenId: state.userReducers.token,
  Ws: state.sock.WS,
});

const mapDispatchToProps = {
  login: (username, password) => (login(username, password)),
  getProfile: () => getProfile(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
