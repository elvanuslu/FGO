/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {useEffect} from 'react';
import {
  setStorage,
  getStorage,
  connectSocket,
  userStatus,
} from '../service/service';
import * as Socks from '../src/redux/actions/';
import * as matchActions from '../src/redux/actions/';

import {ActionTypes} from 'react-websockets-middleware';
var socket = null;

var ws = null; //new WebSocket('ws://api-dev.fogotalk.com:5005/');
export const PortBul = async () => {
  await userStatus().then(res => {
    //console.log('User Status:: ', JSON.stringify(res));
    baglanti =
      'ws://' + res.data.server.host + ':' + res.data.server.port + '/';
    socket = res.data.server.port + '/';
    //console.log('User Test ', baglanti);
  });
  return baglanti;
};

//-------------------------------------
let matchID = null;
export const bindMessage = () => {
  return ws;
};
//accepted"/"rejected
export const match_responseType = async (durum = 'accepted') => {
  try {
    // console.log('match_responseType() ' + ws.readyState);
    if (ws.readyState === 1) {
      let matchData = await getStorage('matchData');
      //console.log('match_responseType: ' + matchData);
      //console.log('ıd: ' + JSON.parse(matchData).data.id);
      var matchId = '';
      if (matchData !== null) {
        matchId = JSON.parse(matchData).data.id;
        console.log('match Id: ' + matchId);
      }
      var matchResponse = JSON.stringify({
        action: 'match_response',
        data: {
          id: matchId,
          response: durum,
        },
      });
      ws.send(matchResponse);
      ws.onmessage = e => {
        console.log('match_responseType() => ' + JSON.stringify(e));
      };
    } else {
      clientConnect();
    }
  } catch (error) {
    console.log('match_responseType() => ' + error);
  }
};
export const socketState = () => {
  return ws.readyState;
};
/*
0	CONNECTING	Socket has been created. The connection is not yet open.
1	OPEN	The connection is open and ready to communicate.
2	CLOSING	The connection is in the process of closing.
3	CLOSED	The connection is closed or couldn't be opened.
*/
export const socketClose = () => {
  ws.close();
  return ws.readyState;
};
export const MatchBul = async () => {
  const token = await getStorage('token');
  var gender = await getStorage('gender');
  clientConnect();
  if (token !== '') {
    sendToken(token);
  } else {
    console.log('Token is empty');
  }

  setTimeout(() => {
    sendMatch(null, true, 'm');
  }, 3000);
  ws.onmessage = e => {
    console.log('sendMatch() => ' + e.data + ' / ' + new Date().toISOString());
  };
};
export const sendMatch = async (that, action = null, gender = '') => {
  try {
    console.log('sendMatch');
    setStorage('matchData', '');
    if (ws.readyState === 1) {
      console.log('sendMatch ready state');
      if (action !== null) {
        let actionData = JSON.stringify({
          action: 'start_matching',
          data: {
            instant: action,
            gender: gender,
          },
        });
        ws.send(actionData);
        /* ws.onmessage = e => {
          this.message.bind(e);
        };
        */
        /* ws.onmessage = e => {
          console.log(
            'sendMatch() => ' + e.data + ' / ' + new Date().toISOString(),
          );
          setStorage('matchData', e.data);
        };
        */
      }
    }
  } catch (error) {
    console.log('sendMatch Hata: ' + error);
  }
};

export const sendToken = async token => {
  try {
    if (ws.readyState === 1) {
      let tokenim = JSON.stringify({
        token: token,
      });
      ws.send(tokenim);
      /*
      ws.onmessage = e => {
        console.log(
          'tokenim =' + JSON.stringify(e) + ' / ' + new Date().toISOString(),
        );
      };
      */
    }
  } catch (error) {
    console.log('sendToken: ' + error);
  }
};
export const receiveMessage = () => {
  ws.onmessage = e => {
    console.log(
      'receiveMessage =' + JSON.stringify(e) + ' / ' + new Date().toISOString(),
    );
  };
};
export const onHandler = e => {
  console.log('e type: ' + JSON.stringify(e));
  if (e.type === 'message') {
    //if (e.data.key !== 'starting_match')
    {
      console.log('e is: ' + e.data + ' ' + new Date().toISOString());
      //setStorage('matchData', e.data);
      //this.setState({messages: e.data});
    }
  }
};

export const clientConnect = async () => {
  try {
    console.log('Ws State: ' + ws.readyState);
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      ws.onopen = () => {
        console.log(
          'connected websocket main component' +
            ' / ' +
            new Date().toISOString(),
        );
        return ws;
      };
    }
    // ws.onMessage = onHandler(this);
    await ReceiveMessage();
    /*ws.onmessage = e => {
      console.log(
        'global mesaage =' +
          JSON.stringify(e) +
          ' / ' +
          new Date().toISOString(),
      );
    };
    */

    // ws.addEventListener('message', onHandler);
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
    console.log('Connect Hatası: ' + error);
  }
};
export const sendMessage = async (websocket, msg) => {
  try {
    const room_id = await getStorage('room_id');
    let info = JSON.stringify({
      action: 'chat_message',
      room_id: room_id,
      message: msg,
    });
    console.log('Inf: ' + info);
    ws.send(info);
  } catch (error) {
    console.log('sendMessage: ' + error);
  }
};

export const JoinRoom = async (userId, roomId) => {
  try {
    const room_id = await getStorage('room_id');
    let prty = JSON.stringify({
      key: 'party_joined_room',
      data: {
        user_id: userId,
        room_id: room_id,
      },
      msg: 'Party joined to chat room.',
    });
    console.log('party ' + prty + ' open: ' + ws.readyState);
    ws.send(prty);
    console.log('Id:  Join Room ' + userId);
    console.log('Conversation Id: ' + roomId);
  } catch (error) {
    console.log('JoinRoom: ', error);
  }
};
export const Reject = (websocket, matchId) => {
  let api = JSON.stringify({
    action: 'match_response',
    data: {
      id: matchId,
      response: 'rejected', //"rejected"
    },
  });
  websocket.send(api);
};
export const returnThis = websocket => {
  socket = websocket;
  return socket;
};
export const returnSocket = () => {
  return socket;
};
export const message = async e => {
  try {
    if (e.data !== null) {
      const key = e.data;
      //console.log('Client Onmessage:' + e.data);
      switch (JSON.parse(key).key) {
        case 'authenticated':
          // console.log('Authenticated: ', e.data);
          //{"key":"authenticated","data":{"id":"5e1dbd48bfa39b7205006372","name":"Aye"},"msg":"Token OK. You are online now"}
          break;
        case 'match_found':
          setStorage('matchId', '');
          //console.log('case match_found::' + e.data);
          Socks.setMatch(JSON.parse(key).data.id);
          setStorage('matchId', JSON.parse(key).data.id);
          matchID = JSON.parse(key).data.id;
          matchActions.setMATCH_NAME(JSON.parse(e.data).data.user.name);
          matchActions.setMATCH_ID(JSON.parse(key).data.id);
          matchActions.setUSER_ID(JSON.parse(e.data).data.user.id);
          matchActions.setMATCH_GENDER(JSON.parse(e.data).data.user.gender);
          matchActions.setMATCH_PROFILE_PHOTO(
            JSON.parse(e.data).data.user.profile_photo,
          );
          matchActions.setMATCH_COUNTRY(
            JSON.parse(e.data).data.user.origin.country,
          );
          matchActions.setMATCH_CITY(JSON.parse(e.data).data.user.origin.city);
          matchActions.setMATCH_LOCALE(JSON.parse(e.data).data.locale);
          matchActions.setMATCH_DISTANCE(JSON.parse(e.data).data.distance);
          // {"key":"match_found","data":{"id":"5e1c2e1e8708e214953948a2","user":{"id":"5e16fb337e305778331f6930","name":"Ahmet ","gender":"m","origin":{"country":"TUR","city":"Istanbul"}},"type":"classic","status":"offline","distance":"0km"}}
          break;
        case 'match_not_found':
          console.log('match_not_found :' + JSON.stringify(e));
          break;
        case 'room_created':
          //{"key":"room_created","data":{"id":"5e1c2a3054ccd26009226e22","status":"questionnaire"},"msg":"Chat room has been created."}
          console.log('room_created: ', e.data);
          // setStorage('room_id', JSON.parse(key).data.id);
          break;
        case 'party_rejected_matching':
          console.log('party_rejected_matching: ', e.data);
          setStorage('party_rejected_matching', JSON.parse(key).data.match_id);
          //{"key":"party_rejected_matching","data":{"id":"5e1c2aaf8708e214953948a0"},"msg":"Other party has rejected matching."}
          break;
        case 'user_gone_offline':
          console.log('user_gone_offline', e.data);
          setStorage('user_gone_offline', e.data);
          //{"key":"user_gone_offline","data":{"user_id":"5e16fb337e305778331f6930","disconnected":true},"msg":"User gone offline."}
          break;
        case 'incoming_message':
          console.log('incoming_message', e.data);
          setStorage('msg', JSON.parse(e.data).data.message);
          //IncomingMessage(JSON.parse(e.data).data.message);
          //{"key":"incoming_message","data":{"user_id":{"$oid":"5e16fb337e305778331f6930"},"room_id":"5e1c2a3054ccd26009226e22","message":"hello"},"msg":"Incoming chat message."}
          break;
        case 'conversation_created':
          console.log('conversation_created::', key);
          console.log(
            'conversation_created:::',
            JSON.parse(key).data.conversation_id,
          );
          setStorage('conversation_created', JSON.parse(e.data).status);
          setStorage('conversation_id', JSON.parse(key).data.conversation_id);
          matchActions.setCONVERSATIONID(JSON.parse(key).data.conversation_id);
          break;
        default:
          console.log('default :', JSON.parse(e.data));
          break;
      }
    }
  } catch (error) {
    console.log('client message() :', error);
  }
};
//---------------------------- 20.02.2019  TODO: Elvan
export const Connect = async () => {
  try {
    var baglanti = '';
    const addr = await PortBul();
    console.log('addr::', addr);
    ws = new WebSocket(addr);
    console.log('Öncesi: ', ws.readyState);
    const token = await getStorage('token');
    if (ws === null || ws.readyState !== WebSocket.OPEN) {
      ws.onopen = () => {
        console.log('Opening: ', ws.readyState);
        Socks.setWS(ws);
        if (token !== null) {
          var Token = JSON.stringify({
            token: token,
          });
          SendMessage(Token);
        }
        ReceiveMessage();
        ReceiveError();
      };
    }
    return ws;
  } catch (error) {
    console.log('Connect :', error);
  }
};

export const CheckConnection = async () => {
  console.log('CheckConnection...', ws);
  if (!ws || ws.readyState !== 1) {
    await Connect();
  }
};

export const ReceiveMessage = async () => {
  try {
    // console.log('Client State Durumu: ' + ws.readyState);
    ws.onmessage = e => {
      message(e);
    };
  } catch (error) {
    console.log('ReceiveMessage: ' + error);
  }
};
export const ReceiveError = async () => {
  ws.onerror = e => {
    console.log('ReceiveError: ' + JSON.stringify(e));
    alert('Match', e, [{text: 'Tamam', onPress: () => ''}], {
      cancelable: true,
    });
  };
};
export const SendMessage = async msg => {
  try {
    //console.log('send Tok::', msg);

    console.log('ws send:', ws.readyState);
    if (ws.readyState !== 1) {
      await Connect();
    }
    ws.send(msg);
  } catch (error) {
    console.log('SendMessage() :', error);
  }
};
export const MatchUser = async gender => {
  try {
    CheckConnection();

    // const gender = await getStorage('gender');
    console.log('MatchUser() ', gender);
    let data = JSON.stringify({
      action: 'start_matching',
      data: {
        instant: 'true',
        gender: gender === 'm' ? 'f' : 'm',
      },
    });
    ws.send(data);
  } catch (error) {
    console.log('MatchUser Error() :', error);
  }
};
export const Accept = async Id => {
  try {
    //console.log('Accept matchId: ', Id);
    let api = JSON.stringify({
      action: 'match_response',
      data: {
        id: Id.matchId,
        response: 'accepted', //"rejected"
      },
    });
    ws.send(api);
  } catch (error) {
    console.log('Accept: ', error);
  }
};
export const CloseConnection = async () => {
  ws.close();
  console.log('Close Connection::', ws.readyState);
};
