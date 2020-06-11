/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {act} from 'react-test-renderer';

var define_api_url = 'https://api-dev.fogotalk.com/';
//const define_api_url = 'http://10.0.2.2/';
const debug_email = 'koray.uygur@kuanto.com.tr';

export const createRoom = async () => {
  try {
    let room = JSON.stringify({
      key: 'room_created',
      data: {
        id: '5e11e549a72d000055007052', //room_id
        status: 'questionnaire',
      },
      msg: 'Chat room has been created.',
    });
  } catch (e) {
    console.log('createRoom: ' + e);
  }
};
export const getObject = async key => {
  try {
    const value = await AsyncStorage.getObject(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('get Error' + e);
  }
};
export const setObject = async (key, val) => {
  try {
    await AsyncStorage.setObject(key, val);
  } catch (e) {
    console.log('save Error' + e);
  }
};
export const storeData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    alert('save Error');
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    alert('get Error');
  }
};
export const userRegister = fields => {
  try {
    console.log('Register Fields: ' + JSON.stringify(fields));
    return postRequest(fields, 'auth/register');
  } catch (error) {
    console.log('userRegister: ' + error);
  }
};
export const detectCityLocation = (lat, lon) => {
  // console.log('Lat/lon : ' + lat + ' - ' + lon);
  try {
    let params = {
      lat: lat,
      long: lon,
    };
    const URL = 'location/detectLocation';
    return postRequest(params, URL);
  } catch (error) {
    console.log('detectCityLocation: ' + error);
  }
};
export const postlogin = async (username, password) => {
  try {
    let userBody = {
      username: username,
      password: password,
    };
    return postRequest(userBody, 'auth/login');
  } catch (error) {
    console.log('login: ' + error);
    return error;
  }
};
// Direk alfabetik olarak ülkeleri verir.
export const getCountries = () => {
  try {
    return postRequest('', 'location/countries');
  } catch (error) {
    console.log('getCountries: ' + error);
  }
};
export const RoomInfo = async id => {
  try {
    var roomId = await getStorage('conversation_id');
    var token = await getStorage('token');
    console.log('Room Id: ' + roomId);
    let info = {
      room_id: roomId,
    };
    return postRequestAuth(info, 'room/info', token);
  } catch (error) {
    console.log('RoomInfo: ' + error);
  }
};

//Options Sorular, one to many sorular için cevaplar.
export const sendAnswer = async (soruId, cevapId) => {
  try {
    var roomId = await getStorage('conversation_id');
    var token = await getStorage('token');
    //console.log('SoruId: ', soruId, cevapId, roomId, token);
    let info = {
      conversation_id: roomId,
      question_id: soruId,
      answer: cevapId,
    };
    return postRequestAuth(info, 'questionnaire/sendAnswer', token);
  } catch (error) {
    console.log('sendAnswer: ' + error);
  }
};
export const getNextQuestion = async () => {
  try {
    var roomId = await getStorage('conversation_id');
    var token = await getStorage('token');

    let info = {
      conversation_id: roomId,
    };
    //console.log('question Room: ', info);
    //console.log('question token: ', token);
    return postRequestAuth(info, 'questionnaire/getNext', token);
  } catch (error) {
    console.log('getNextQuestion: ' + error);
  }
};
export const getNextQuestionId = async id => {
  try {
    var token = await getStorage('token');

    let info = {
      conversation_id: id,
    };
    //console.log('question Room: ', info);
    //console.log('question token: ', token);
    return postRequestAuth(info, 'questionnaire/getNext', token);
  } catch (error) {
    console.log('getNextQuestion: ' + error);
  }
};
// Ülkenin şehirlerini verir.
// Parametreler:
//country_id
//country_code //iso3
/*
Response:
[
    status: true,
    data: [
        {
            id: '5dd7f51fd84a00005d0083d2',
            name: 'Istanbul'
        }...
    ]
]
*/
export const getCities = (country_id, country_code) => {
  try {
    let userBody = {
      country_id: country_id,
      country_code: country_code,
    };
    return postRequest(userBody, 'location/cities');
  } catch (error) {
    console.log('getCities: ' + error);
  }
};
/*
Şehir inputundaki arama için kullanılabilir. Arama kelimesini taratıp ülke/şehir döner. Country_code bilgisi gelirse o ülke sonuçlarına öncelik verir.
Toplam 10 sonuç verir.
Response:
[
    status: true,
    data: [
        {
            id: "5dd7f51fd84a00005d0083d2",
            name: "Istanbul",
            country_code: "TUR",
            country_name: "Türkiye"
        },
        {
            id: "5dd7f51fd84a00005d008406",
            name: "Isparta",
            country_code: "TUR",
            country_name: "Türkiye"
        } …
    ]
]

*/
export const searchCities = (search, country_code) => {
  try {
    let userBody = {
      search: search,
      country_code: country_code,
    };
    return postRequest(userBody, 'location/searchCities');
  } catch (error) {
    console.log('getCities: ' + error);
  }
};

export const postRequestAuth = async (body, url, token) => {
  let api_url = await getData('api_url');
  if (api_url === undefined || api_url === '') {
    api_url = define_api_url;
  }
  const ApiUrl = api_url + url;

  console.log('body/ApiURL: ' + JSON.stringify(body), ApiUrl);
  let data = await fetch(ApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'debug-email': debug_email,
    },
    body: JSON.stringify(body),
  }).then(resp => resp.json());
  if (data.status === undefined) {
    data.success = false;
    data.errors = 'Hatalı api url';
    data.data = [];
  }
  return data;
};
export const postRequest = async (body, url) => {
  let api_url = await getData('api_url');
  if (api_url === undefined || api_url === '') {
    api_url = define_api_url;
  }
  const ApiUrl = api_url + url;

  console.log('body/ApiURL: ' + JSON.stringify(body), ApiUrl);
  let data = await fetch(ApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(resp => resp.json());

  if (data.status === undefined) {
    data.success = false;
    data.errors = 'Hatalı api url';
    data.data = [];
  }
  return data;
};
export const getStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value; // JSON.parse(value);
    } else {
      return '';
    }
  } catch (error) {
    console.log('Hata oluştu', error);
  }
};

export const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value + '');
  } catch (error) {
    console.log('Hata oluştu', error);
  }
};
export const checkSocket = async ws => {
  try {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
    }
  } catch (error) {
    return 'Hata oluştu: ' + error;
  }
};
var ws = new WebSocket('ws://api-dev.fogotalk.com:5005/');
var msg = null;
export const connectSocket = async (
  that,
  token,
  sendMessage,
  action = false,
  gender = '',
) => {
  try {
    console.log('Start');

    if (!ws || ws.readyState === WebSocket.CLOSED) {
      var connectInterval;
      that.timeout = 250;
      clearTimeout(connectInterval);

      ws.onopen = () => {
        console.log(
          'connected websocket main component' +
            ' / ' +
            new Date().toISOString(),
        );

        console.log('Token socks: ' + tokenim);

        ws.onerror = err => {
          console.error(
            'Socket encountered error: ',
            err.message,
            'Closing socket',
          );
          ws.close();
          return err.message;
        };
      };
    }
    //------------
    var tokenim = JSON.stringify({
      token: token,
    });
    ws.send(tokenim);
    ws.onmessage = e => {
      console.log(
        'tokenize 1 =' + JSON.stringify(e) + ' / ' + new Date().toISOString(),
      );
      //return e.data;
    };
    //-----------------
    if (sendMessage !== '') {
      ws.send(sendMessage);
      ws.onmessage = e => {
        console.log('Connect Socket =' + e);
        //return e.data;
      };
    }
    console.log('Action: ' + action);
    if (action !== false) {
      let actionData = JSON.stringify({
        action: 'start_matching',
        data: {
          instant: 'true',
          gender: gender,
        },
      });
      setTimeout(() => {
        console.log(
          'Giden Action: ' + actionData + ' / ' + new Date().toISOString(),
        );
        ws.send(actionData);
        ws.onmessage = e => {
          console.log('Start Matching =' + e.data);
          storeData('actionData', e.data);
          // return e.data;
        };
      }, 10);
    }
    ws.onerror = err => {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket',
      );
      ws.close();
      return err.message;
    };
  } catch (error) {
    ws.close();
    return 'Hata oluştu: ' + error;
  }
};
export const sendPhoto = async val => {
  try {
    var token = await getStorage('token');
    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/add-photo', token);
  } catch (error) {
    console.log('sendAnswer: ' + error);
  }
};
export const removePhoto = async val => {
  try {
    var token = await getStorage('token');
    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/remove-photo', token);
  } catch (error) {
    console.log('sendAnswer: ' + error);
  }
};
export const selectPhoto = async val => {
  try {
    var token = await getStorage('token');
    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/select-photo', token);
  } catch (error) {
    console.log('sendAnswer: ' + error);
  }
};
export const userProfile = async () => {
  try {
    var token = await getStorage('token');

    return postRequestAuth('', 'user/profile', token);
  } catch (error) {
    console.log('sendAnswer: ' + error);
  }
};
export const checkToken = async () => {
  try {
    var token = await getStorage('token');

    return postRequestAuth('', 'auth/checkToken', token);
  } catch (error) {
    console.log('sendAnswer: ' + error);
  }
};
export const userNameUpdate = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/update/name', token);
  } catch (error) {
    console.log('userNameUpdate: ' + error);
  }
};
export const userSloganUpdate = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/update/slogan', token);
  } catch (error) {
    console.log('userSloganUpdate: ' + error);
  }
};
export const userAboutMeUpdate = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/update/about-me', token);
  } catch (error) {
    console.log('userAboutMeUpdate: ' + error);
  }
};
export const userOccupationUpdate = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/update/occupation', token);
  } catch (error) {
    console.log('userOccupationUpdate: ' + error);
  }
};
export const userBirthDayUpdate = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/update/birthday', token);
  } catch (error) {
    console.log('userBirthDayUpdate: ' + error);
  }
};
export const userLocationUpdate = async payload => {
  try {
    var token = await getStorage('token');
    return postRequestAuth(payload, 'user/profile/update/location', token);
  } catch (error) {
    console.log('userLocationUpdate: ' + error);
  }
};
export const userEmailCheck = async email => {
  try {
    return postRequest({email}, 'auth/check-email');
  } catch (error) {
    console.log('userEmailCheck: ' + error);
  }
};
export const userEmailUpdate = async (val, kod) => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
      code: kod,
    };
    return postRequestAuth(info, 'user/profile/update/email', token);
  } catch (error) {
    console.log('userEmailUpdate: ' + error);
  }
};

export const sendEmailCode = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/sendEmailCode', token);
  } catch (error) {
    console.log('sendEmailCode: ' + error);
  }
};
export const verifyEmailCode = async val => {
  try {
    var token = await getStorage('token');

    let info = {
      value: val,
    };
    return postRequestAuth(info, 'user/profile/verifyEmailCode', token);
  } catch (error) {
    console.log('verifyEmailCode: ' + error);
  }
};

export const messageList = async id => {
  try {
    var token = await getStorage('token');

    let info = {
      room_id: id,
    };
    return postRequestAuth(info, 'room/messages', token);
  } catch (error) {
    console.log('messageList: ' + error);
  }
};
export const roomList = async () => {
  try {
    var token = await getStorage('token');
    //alert(token);
    return postRequestAuth('', 'conversation/list', token);
  } catch (error) {
    console.log('roomList: ' + error);
  }
};

export const conversationList = async () => {
  try {
    var token = await getStorage('token');

    return postRequestAuth('', 'conversation/list', token);
  } catch (error) {
    console.log('conversationList: ' + error);
  }
};

export const conversationInfo = async conversation_id => {
  try {
    var token = await getStorage('token');
    let info = {
      conversation_id: conversation_id,
    };
    return postRequestAuth(info, 'conversation/info', token);
  } catch (error) {
    console.log('conversationInfo: ' + error);
  }
};
export const conversationMessage = async conversation_id => {
  try {
    var token = await getStorage('token');
    let info = {
      conversation_id: conversation_id,
    };
    // console.log('conversationMessage: ', token, info);
    return postRequestAuth(info, 'conversation/messages', token);
  } catch (error) {
    console.log('conversationMessage: ' + error);
  }
};
export const userStatus = async () => {
  try {
    var token = await getStorage('token');
    //console.log('tkn: ', token);
    return postRequestAuth('', 'user/status', token);
  } catch (error) {
    console.log('userStatus: ' + error);
  }
};
export const createGuid = async () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const mapStateToProps = (state, ownProps) => ({
  userName: state.auth.username,
  userId: state.auth.uid,
  emailId: state.profile.email,
  //tokenId: state.userReducers.token,
  gender: state.profile.gender,
  role: state.auth.role,
  Ws: state.sock.WS,
  Match: state.match,
  Name: state.match.Name,
  matchId: state.match.matchId,
  UserId: state.match.UserId,
  Gender: state.match.Gender,
  profile_photo: state.match.profile_photo,
  Country: state.match.Country,
  City: state.match.City,
  Locale: state.match.locale,
  Distance: state.match.distance,
  ConversationID: state.match.ConversationID,
});
