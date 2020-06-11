/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Image, StatusBar} from 'react-native';

import {Container, Header, Title, Left, Right, Body, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo'; //dots-three-vertical
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const geri = require('../assets/ok.png');

export const header = (baslik, nav, props, params) => {
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <Header transparent style={{backgroundColor: 'transparent'}}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.push(nav, {...params})}>
            <Image
              style={{width: 20, height: 15, marginRight: 20}}
              source={geri}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'black'}}>{baslik}</Title>
        </Body>
        <Right />
      </Header>
    </View>
  );
};
export const headerChat = (baslik, nav, props, colr) => {
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header transparent style={{backgroundColor: 'white'}}>
        <Left>
          <Button transparent onPress={() => props.navigation.push(nav)}>
            <Image
              style={{width: 20, height: 15, marginRight: 20}}
              source={geri}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{color: colr, fontFamily: 'Raleway-Regular'}}>
            {baslik}
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={() => alert('click')}>
            <Icon name="dots-three-vertical" />
          </Button>
        </Right>
      </Header>
    </View>
  );
};
export const headerRenkli = (baslik, nav, props, colr) => {
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header transparent style={{backgroundColor: 'white'}}>
        <Left>
          <Button transparent onPress={() => props.navigation.navigate(nav)}>
            <Image
              style={{width: 20, height: 15, marginRight: 10}}
              source={geri}
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{color: colr, fontSize: 12, fontFamily: 'Raleway-Regular'}}>
            {baslik}
          </Title>
        </Body>
        <Right>
          {/*
          <Button transparent onPress={() => props.navigation.navigate(nav)}>
            <MaterialIcon name="dots-vertical" size={20} color="#900" />
          </Button>
          */}
        </Right>
      </Header>
    </View>
  );
};
export const BosHeader = (baslik, nav, props) => {
  return (
    <Container style={{backgroundColor: 'transparent'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header transparent style={{backgroundColor: '#fdfbfb'}}>
        <Left>
          <Button transparent onPress={() => props.navigation.pop()} />
        </Left>
        <Body>
          <Title style={{color: 'black'}}>{baslik}</Title>
        </Body>
        <Right />
      </Header>
    </Container>
  );
};
//push(nav)
