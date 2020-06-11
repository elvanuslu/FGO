/* eslint-disable react/self-closing-comp */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Component} from 'react';

import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Input,
  Item,
  Content,
  Card,
  CardItem,
} from 'native-base';
import styles from '../styles/styles';
import {FlatGrid} from 'react-native-super-grid';
import FullWidthImage from 'react-native-fullwidth-image';
import Video from 'react-native-video';
import {header, headerRenkli} from '../Component/header';
import {spinner} from '../Component/spinner';
import {
  TalkHeader,
  buttonOnPressWithWidth,
  GrafikSoru,
  VideoSoru,
} from '../Component/button';

const ustBar = require('../assets/talk/ustbar.png');
const kizlar = require('../assets/talk/kizlar.png');
const bosprofildolu = require('../assets/talk/bosprofildolu.png');
const cizgi = require('../assets/talk/cizgi.png');
const cips = require('../assets/talk/cips.png');
const et = require('../assets/talk/et.png');
const makarna = require('../assets/talk/makarna.png');
const sambali = require('../assets/talk/sambali.png');
const sendbuton = require('../assets/talk/sendbuton.png');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Fourth Item',
  },
];

export const _onPress = (item, index) => {
  this.setState({selected: true});
  this.setState({selectedItem: item.id});
  alert(JSON.stringify(item) + '---' + index);
};
export const textSoru = (nav,soruTipi,selectedItem, prop)  => {
  if (soruTipi === 0) {
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: '#e53935',
              fontFamily: 'Raleway-Regular',
              textAlign: 'center',
            }}>
            Q1:
            <Text style={{color: '#424242', fontWeight: 'normal'}}>
              {' '}
              Bu test sizin her türlü sorunuza cevap veriyor. Tek yapmanız
              gereken alttaki soru kısmına sorunuzu yazmanız.
            </Text>
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <FlatList
            numColumns={1}
            extraData={selectedItem}
            data={DATA}
            renderItem={({item, index, separators}) => (
              <View style={{backgroundColor: 'transparent'}}>
                <Card
                  style={{
                    borderColor: 'transparent',
                    marginTop: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 5,
                  }}>
                  <CardItem
                    button
                    onPress={() => {
                      'setSelectedItem(item.id);';
                    }}
                    style={
                      selectedItem === item.id
                        ? {
                            backgroundColor: '#116cb3',
                            marginTop: 2,
                            borderRadius: 5,
                          }
                        : {
                            backgroundColor: '#fff',
                            marginTop: 2,
                            borderRadius: 5,
                          }
                    }>
                    <Icon active name="logo-googleplus" />
                    <Text
                      style={
                        selectedItem === item.id
                          ? {
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'center',
                              fontSize: 14,
                              color: '#fff',
                            }
                          : {
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'center',
                              fontSize: 14,
                            }
                      }>
                      {item.title}
                    </Text>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </CardItem>
                </Card>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{backgroundColor: 'transparent'}}>
          {buttonOnPressWithWidth(
            'SEND',
            'Chat',
            120,
            sendbuton,
            '#ef5350',
            this,
          )}
        </View>
      </View>
    );
  }
};

