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
const sendbuton = require('../assets/talk/sendbuton.png');

export const renderSoru = (soru, options) => {
  console.log('propsmany: ', soru);
  return (
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
        Q{soru.question.step}:
        <Text style={{color: '#424242', fontWeight: 'normal'}}>
          {' '}
          {soru.question.content}
        </Text>
      </Text>
    </View>
  );
};

export const SoruRender = () => {
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
            Bu test sizin her türlü sorunuza cevap veriyor. Tek yapmanız gereken
            alttaki soru kısmına sorunuzu yazmanız.
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
          extraData={secilenId}
          data={props.data}
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
                    secilenId === item.id
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
                      secilenId === item.id
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
      </View>
    </View>
  );
};
