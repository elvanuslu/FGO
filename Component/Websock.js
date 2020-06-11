/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import {Component} from 'react';
import PropTypes from 'prop-types';
import {setStorage, getStorage} from '../service/service';
import ChildComponent from './ChildComponent';
//const sw = new WebSocket('ws://api-dev.fogotalk.com:5005/');

export default class websocket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null,
    };
  }
  timeout = 250;
  componentDidMount() {
    this.connect();
  }
  connect = () => {
    var ws = new WebSocket('ws://api-dev.fogotalk.com:5005/');
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log('connected websocket main component');

      this.setState({ws: ws});

      that.timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000,
        )} second.`,
        e.reason,
      );

      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket',
      );

      ws.close();
    };
  };
  check = () => {
    const {ws} = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      this.connect();
    } //check if websocket instance is closed, if so call `connect` function.
  };

  render() {
    return <ChildComponent websocket={this.state.ws} />;
  }
}
