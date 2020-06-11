/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {MessageText, Bubble} from 'react-native-gifted-chat';
import Foundation from 'react-native-vector-icons/Entypo';

import styles from '../styles/styles';
export const Button = ({
  onPress,
  size = 30,
  color = 'rgba(0,0,0,0.5)',
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <Foundation size={size} color={color} {...props} />
  </TouchableOpacity>
);

export default class AccessoryBar extends Component {
  render() {
    const {onSend, isTyping} = this.props;
    return (
      <View style={styles.containerAcs}>
        <Button onPress={() => alert('Photo')} name="image" />
        <Button onPress={() => alert('camera', onSend)} name="camera" />
        <Button onPress={() => alert('location', onSend)} name="map" />
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
