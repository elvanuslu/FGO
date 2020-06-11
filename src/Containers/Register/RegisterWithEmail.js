/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Text, Input, Item} from 'native-base';
import {validateEmail} from '../../../Component/Tools/Validation';
import {userEmailCheck} from '../../../service/service';
import Button from '../../../Component/Shared/Button';
import {header} from '../../../Component/header';
import {logoveYazi} from '../../../Component/logoveYazi';
const logo = require('../../../assets/logo.png');
const carpi = require('../../../assets/carpi.png');
import AntIcon from 'react-native-vector-icons/AntDesign';

class RegisterWithEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: this.props.navigation.getParam('email'),
      errorMessage: null,
      showLostPassword: false,
      inputDisabled: !this.props.navigation.getParam('email'),
    };
  }

  _changeEmail = value => {
    if (validateEmail(value)) {
      this.setState({inputDisabled: false});
    } else {
      this.setState({inputDisabled: true});
    }
    this.setState({email: value});
  };

  _continue = () => {
    if (this.state.email !== null) {
      this.setState({inputDisabled: false});
    }
    userEmailCheck(this.state.email).then(result => {
      if (result.status) {
        this.setState({
          errorMessage: 'Bu E-Posta kullanılmakta. Şifrenizi mi unuttunuz?',
          showLostPassword: true,
        });
      } else {
        this.setState({
          errorMessage: null,
          showLostPassword: false,
        });
        this.props.navigation.push('registerWithEmailDetails', {
          email: this.state.email,
        });
      }
    });
  };

  _sendLostPasswordCode = () => {};

  render() {
    return (
      <Container style={{backgroundColor: '#f1f0f0'}}>
        {header('', 'register', this.props)}
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 40,
          }}>
          <Item
            regular
            style={{
              borderRadius: 20,
              backgroundColor: 'white',
              marginVertical: 10,
            }}>
            <Input
              style={{color: 'black', marginLeft: 10}}
              placeholder="E-Posta"
              keyboardType="email-address"
              placeholderTextColor="#808080"
              onChangeText={value => this._changeEmail(value)}
              value={this.state.email}
              underlineColorAndroid="transparent"
            />
            {this.state.inputDisabled ? (
              <AntIcon
                name="close"
                size={20}
                color="#28edaa"
                style={{marginRight: 15}}
              />
            ) : (
              <AntIcon
                name="check"
                size={20}
                color="#fd1313"
                style={{marginRight: 15}}
              />
            )}
          </Item>
          <Text style={{color: '#fd4e4e', fontSize: 12, textAlign: 'center'}}>
            {this.state.errorMessage}
          </Text>

          {this.state.showLostPassword && (
            <View style={{marginTop: 10}}>
              <Button
                colors={['#ffffff', '#ffffff']}
                fontColor={'#888888'}
                borderWidth={1}
                borderColor={'#dedede'}
                action={() => this._sendLostPasswordCode()}>
                ŞİFRE HATIRLATMA E-POSTASI GÖNDER
              </Button>
            </View>
          )}

          <View style={{marginTop: 25}}>
            <Button
              disabled={this.state.inputDisabled}
              action={() => this._continue()}>
              DEVAM ET
            </Button>
          </View>
        </View>

        <View
          style={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginBottom: 20,
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
      </Container>
    );
  }
}
export default RegisterWithEmail;
