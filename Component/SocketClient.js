/* global WebSocket */
/* eslint no-unused-vars: "off" */
/* eslint-disable no-undef */
import {Component} from 'react';
import PropTypes from 'prop-types';
import {setStorage, getStorage} from '../service/service';
const sw = new WebSocket('ws://api-dev.fogotalk.com:5005/');

class SocketClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
    };
  }

  static defaultProps = {
    reconnect: false,
  };

  static propTypes = {
    url: PropTypes.string,
  //  sendData: PropTypes.string,
    reconnect: PropTypes.bool,
    onOpen: PropTypes.func,
    onMessage: PropTypes.func,
    onError: PropTypes.func,
    onClose: PropTypes.func,
   // onSendData: PropTypes.func,
  };
  send = data => {
    console.log('datam: ' + data);
    this.state.ws.send(data);
  };

  componentDidMount() {
    this.reconnect = !!this.props.reconnect;
    this._handleWebSocketSetup();
  }

  componentWillUnmount() {
    this.reconnect = false;
    console.log('wsa: ' + this.state.ws);
    this.state.ws.close();
  }

  render() {
    return null;
  }
  sendData = data => {
    console.log('sendData: ' + data);
    ws.send(data);
  };
  onerror = err => {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
  };
  message = e => {
    console.log('First this e :' + JSON.stringify(e));
    switch (e) {
      case 'message':
        console.log('this e :' + JSON.stringify(e));
        break;

      default:
        break;
    }
  };

  _handleWebSocketSetup = async () => {
    const ws = new WebSocket(this.props.url);
    console.log('this.props: ' + JSON.stringify(this.props));
    //const sendTxt = await getStorage('dataState'); //this.props.sendData;
    // console.log('sendTXT: ' + sendTxt);
    //  if (sendTxt !== null) {
    //   ws.send(sendTxt);
    // }
    ws.onopen = () => {
      this.props.onOpen && this.props.onOpen();
    };

    ws.onmessage = event => {
      this.message.bind(this);
      //this.props.onMessage && this.props.onMessage(event);
    };
    ws.onerror = error => {
      this.onerror.bind(this);
      //this.props.onError && this.props.onError(error);
    };
    ws.onclose = () =>
      this.reconnect
        ? this._handleWebSocketSetup()
        : this.props.onClose && this.props.onClose();
    this.setState({ws});
    setStorage('WS', ws);
  };
}
export default SocketClient;
