/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {Container} from 'native-base';
import {header} from '../../../Component/header';
import {button} from '../../../Component/button';
import {logoveYazi} from '../../../Component/logoveYazi';
const logo = require('../../../assets/logo.png');
const epostabutonu = require('../../../assets/pButton.png');
const google = require('../../../assets/gButon.png');
const facebook = require('../../../assets/fButton.png');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      myTextContentType: true,
    };
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    return (
      <Container style={{backgroundColor: 'transparent'}}>
        {header('', 'landing', this.props)}
        <View style={{flex: 1, paddingRight: 40, paddingLeft: 40}}>
          <View style={{flex: 1}}>
            {button(
              'E-POSTA İLE KAYIT',
              'registerWithEmail',
              this.props,
              epostabutonu,
              'white',
            )}
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: 'transparent',
              flexDirection: 'column',
            }}>
            <View style={{marginBottom: 0}}>
              {button(
                'FACEBOOK İLE BAĞLAN',
                'landing',
                this.props,
                facebook,
                'white',
              )}
            </View>
            <View>
              {button(
                'GOOGLE İLE BAĞLAN',
                'landing',
                this.props,
                google,
                '#518ef8',
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              alignContent: 'flex-start',
            }}>
            {logoveYazi(
              'Already have an account? ',
              '',
              this.props,
              logo,
              'SIGN IN',
            )}
          </View>
        </View>
      </Container>
    );
  }
}

export default Register;
