/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StyleSheet, Alert} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {
  PortBul,
  ReceiveMessage,
  ReceiveError,
  CloseConnection,
  Connect,
} from './Component/client';
import * as Socks from './src/redux/actions/';
import {
  setJSExceptionHandler,
  getJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Intro from './src/Intro';
import SearchMain from './src/SearchMain';
import SearchMainAsamaBir from './src/SearchMainAsamaBir';
import SearchMainAsamaIki from './src/SearchMainAsamaIki';

import Talk1 from './src/Talk1';
import Chat from './src/Chat';

import PersonalChat from './src/PersonalChat';
import SohbetBaslat from './src/SohbetBaslat';
import Chatty from './src/Chatty';
import Mesajlar from './src/Mesajlar';
//import KayitAnaEkran from './src/Register/KayitAnaEkran';
//import KayitEkranAsamaBir from './src/Register/KayitEkranAsamaBir';
//import KayitEkranAsamaIki from './src/Register/KayitEkranAsamaIki';

// new screens
import Boot from './src/Containers/Boot/Boot';
import Landing from './src/Containers/Landing/Landing';
import Login from './src/Containers/Login/Login';
import Register from './src/Containers/Register/Register';
import RegisterWithEmail from './src/Containers/Register/RegisterWithEmail';
import RegisterWithEmailDetails from './src/Containers/Register/RegisterWithEmailDetails';
import Profile from './src/Containers/Profile/Profile';
import AppSettings from './src/Containers/Profile/AppSettings';
import ProfileSettings from './src/Containers/Profile/ProfileSettings';
import WelcomeTutorial from './src/Containers/WelcomeGuide/WelcomeGuide';

const AppNavigator = createStackNavigator(
  {
    boot: {screen: Boot},
    landing: {screen: Landing},
    login: {screen: Login},
    register: {screen: Register},
    registerWithEmail: {screen: RegisterWithEmail},
    registerWithEmailDetails: {screen: RegisterWithEmailDetails},
    Intro: {screen: Intro},
    SearchMain: {screen: SearchMain},
    SearchMainAsamaBir: {screen: SearchMainAsamaBir},
    SearchMainAsamaIki: {screen: SearchMainAsamaIki},
    Talk1: {screen: Talk1},
    Chat: {screen: Chat},
    PersonalChat: {screen: PersonalChat},
    SohbetBaslat: {screen: SohbetBaslat},
    Mesajlar: {screen: Mesajlar},
    Chatty: {screen: Chatty},
    // new screens
    welcomeTutorial: {screen: WelcomeTutorial},
    profile: {screen: Profile},
    appSettings: {screen: AppSettings},
    profileSettings: {screen: ProfileSettings},
  },
  {
    // mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);
setNativeExceptionHandler(exceptionString => {
  Alert.alert(
    'setNativeExceptionHandler error occured',
    'Error: ' + exceptionString,
    [{text: 'Tamam', onPress: () => ''}],
    {
      cancelable: true,
    },
  );
});
const errorHandler = (e, isFatal) => {
  /* Alert.alert(
    'Unexpected error occured',
    'Unexpected Error : ' + e.name + ' -message- ' + e.message,
    [{text: 'Tamam', onPress: () => ''}],
    {
      cancelable: true,
    },
  );
  */
};
setJSExceptionHandler(errorHandler, true);
setNativeExceptionHandler(errorHandler, true);

export default class App extends React.Component {
  componentDidMount = async () => {
    //const ws = new WebSocket('ws://api-dev.fogotalk.com:5006/');
    //Socks.setWS(ws);
    Connect();
    /*  if (!__DEV__) {
      global.console = {
        ...console,
        info: () => {},
        log: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
      };
    }
    */
    //CloseConnection();
    //Connect();
    //CheckConnection();
  };

  componentWillUnmount() {
    console.log('App.js unmount');
    CloseConnection();
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
