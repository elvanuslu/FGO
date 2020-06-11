/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Spinner} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const Button = props => {
  const disabled = ['#888888', '#aaaaaa'];
  let colors = props.colors ? props.colors : ['#f5316f', '#ff7b42'];
  return (
    <TouchableOpacity disabled={props.disabled} onPress={() => props.action()}>
      <LinearGradient
        start={{x: 0, y: 0}}
        colors={props.disabled ? disabled : colors}
        style={{
          borderRadius: 25,
          height: 50,
          borderWidth: props.borderWidth ? props.borderWidth : 0,
          borderColor: props.borderColor ? props.borderColor : '#ffffff',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: props.fontColor ? props.fontColor : '#ffffff',
              fontWeight: 'bold',
              fontSize: props.fontSize ? props.fontSize : 14,
            }}>
            {props.children}
          </Text>
          {props.isLoading && <Spinner color="white" style={{marginLeft: 10}} />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
