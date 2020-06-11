/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Text, View, Image, StatusBar, TouchableOpacity} from 'react-native';

import {Container, Header, Title, Left, Right, Body, Button} from 'native-base';
import styles from '../styles/styles';
export const logoveYazi = (text, nav, props, img, sign) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: '25%', resizeMode:'contain', marginTop:-50}}
        source={img}
      />

      <View style={{marginTop: -50}}>
        <TouchableOpacity onPress={() => props.navigation.push(nav)}>
          <View style={{marginTop: 0}}>
            <Text style={styles.textString}>
              {text} <Text style={styles.red}>{sign}</Text>{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
