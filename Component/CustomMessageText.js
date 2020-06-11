/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {MessageText, Bubble} from 'react-native-gifted-chat';
import Foundation from 'react-native-vector-icons/Foundation';
import {useDimensions} from '@react-native-community/hooks';

import styles from '../styles/styles';

const sendbuton = require('../assets/talk/sendbuton.png');
var Secim = {};
function useSecimStatus(id) {
  const [Secilen, setSecilen] = useState(null);
  function handleStatusChange(status) {
    setSecilen(status);
  }
  console.log('proper: ', Secilen);
  return Secilen;
}
export const CustomMessageText = props => {
  const {currentMessage} = props;
  const {text: currText} = currentMessage;
  const [Secilen, setSecilen] = useState(null);
  // console.log('proper: ', Secilen);
  return (
    <View style={styles.soruboxView}>
      <MessageText
        {...props}
        style={{flex: 1}}
        textStyle={{
          // color: '#f53c76',
          left: {
            textAlign: 'left',
            fontFamily: 'Raleway-Medium',
            fontSize: 12,
            color: props.currentMessage.Sorumu
              ? '#f53c76'
              : props.currentMessage.Options
              ? '#000'
              : '#000',
          },
          right: {
            textAlign: 'left',
            fontFamily: 'Raleway-Medium',
            fontSize: 12,
            color: props.currentMessage.Sorumu === true ? '#f53c76' : '#fff',
          },
        }}
        currentMessage={{
          ...currentMessage,
          text: currText.replace('Button', '').trim(),
        }}
      />

      {props.currentMessage.ButtonKoy ? (
        <View
          style={{
            //justifyContent: 'center',
            alignSelf: 'center',
            // backgroundColor: 'yellow',
            padding: 5,
          }}>
          <TouchableOpacity onPress={() => alert('sendeCevap')}>
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
};

function SeciliOlan(id, props) {
  console.log('id is, ', id, props);
  this.props = props;
  // const [Secilen, setSecilen] = useState(null);
  //setSecilen(id);
  //console.log('SeciliOlan:: ', Secilen);
  alert(id);
  this.props.navigation.push('Chatty');
  return Secilen;
}

export const RenderBubble = props => {
  const [Secili, SetSecili] = useState(null);
  console.log('Secili: ', Secili);
  useEffect(() => {
    SetSecili(props.currentMessage._id);
  }, [props, props.currentMessage._id]);
  console.log('systen: ', props);

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
      onLongPress={() => SetSecili(props.currentMessage._id)}
      textStyle={{
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
            props.currentMessage.Sorumu || props.currentMessage.Options ? 5 : 0,
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
              : Secili
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

export const Button = ({
  onPress,
  size = 10,
  color = 'rgba(0,0,0,0.5)',
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <Foundation size={size} color={color} {...props} />
  </TouchableOpacity>
);

export default class AccessoryBar extends React.Component {
  render() {
    const {onSend, isTyping} = this.props;
    return (
      <View style={styles.containerAcs}>
        <Button onPress={() => alert('Photo')} name="photo" />
        <Button onPress={() => alert('camera', onSend)} name="camera" />
        <Button onPress={() => alert('location', onSend)} name="my-location" />
        <Button
          onPress={() => {
            isTyping();
          }}
          name="chat"
        />
      </View>
    );
  }
}
