/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Button,
  Input,
  Item,
  Content,
} from 'native-base';
const erkekbuton = require('../assets/CButon.png');
const kucukButton = require('../assets/kucukButon.png');

export default function UserRegistration() {
  const [email, setEmail] = useState('');
  const [Adi, setAdi] = useState('');
  const [soyadi, setSoyadi] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('E');
  const [cityId, setCityId] = useState('');
  const [clientId, setClientId] = useState(''); // IOS - Android Cihaz Id
  const [clienttype, setClientType] = useState(''); // IOS Yada Android
  const [locale, setLocale] = useState('');
  const [passwordagain, setPasswordAgain] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const addUser = () => {
    if (email.length > 0) {
      setEmail(email);
      setAdi(Adi);
      setSoyadi(soyadi);
      setPassword(password);
      setGender(gender);
      setCityId(cityId);
      setClientId(clientId);
      setClientType(clienttype);
      setLocale(locale);
      setPassword(password);
      setPasswordAgain(passwordagain);
      setLat(lat);
      setLon(lon);
    }
  };
}