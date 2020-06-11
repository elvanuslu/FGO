/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Component} from 'react';
import {connect} from 'react-redux';
import {checkToken} from './../../redux/actions/authA';
import {getProfile} from './../../redux/actions/profileA';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {Spinner} from 'native-base';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../../../assets/logo.png';

class Boot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      preProcessing: false,
      open: false,
    };
    // this.socket = new WebSocket();
    // this.emit = this.emit.bind(this);
  }
  onSocketInit = async () => {
    // const wsport = PortBul();
  };

  async componentDidMount() {
    //AsyncStorage.setItem('token', 'asdasd');
    this.checkPermission();
    this.getNot();
    await this.autoLogin();
  }

  async autoLogin() {
    if (this.props.isAuthenticated && this.props.profileInitialized) {
      this.props.navigation.push('SearchMain');
    } else {
      this.setState({preProcessing: true});
      const tokenResult = await this.props
        .checkToken()
        .catch(() => this.props.navigation.push('landing'));
      if (!tokenResult) {
        this.props.navigation.push('landing');
      }
      if (tokenResult) {
        const profileResult = await this.props
          .getProfile()
          .catch(() => this.props.navigation.push('landing'));
        if (profileResult) {
          this.props.navigation.push('SearchMain');
        }
      }
    }
  }

  subscribeToNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
      'notification_channel_name', // To be Replaced as per use
      'Notifications', // To be Replaced as per use
      firebase.notifications.Android.Importance.Max,
    ).setDescription(
      'A Channel To manage the notifications related to Application',
    );
    firebase.notifications().android.createChannel(channel);

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('onNotification notification-->', notification);
        console.log('onNotification notification.data -->', notification.data);
        console.log(
          'onNotification notification.notification -->',
          notification.notification,
        );
        // Process your notification as required
        this.displayNotification(notification);
      });
  }

  displayNotification = notification => {
    if (Platform.OS === 'android') {
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('notification_channel_name')
        .android.setSmallIcon('ic_launcher')
        .android.setLargeIcon('ic_launcher')
        .android.setColor('#af2104')
        .android.setBadgeIconType(
          firebase.notifications.Android.BadgeIconType.Small,
        )
        .android.setPriority(firebase.notifications.Android.Priority.High);
      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error('Error: ' + err));
    }
  };

  getNot = () => {
    firebase
      .messaging()
      .hasPermission()
      .then(hasPermission => {
        if (hasPermission) {
          this.subscribeToNotificationListeners();
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              this.subscribeToNotificationListeners();
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('before fcmToken: ', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('after fcmToken: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        this.getToken();
      })
      .catch(error => {
        console.log('permission rejected');
      });
  }

  async checkPermission() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('Permission granted');
          this.getToken();
        } else {
          console.log('Request Permission');
          this.requestPermission();
        }
      });
  }

  render() {
    const {preProcessing} = this.state;
    if (!preProcessing) {
      return <SafeAreaView style={styles.container} />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={'transparent'}
          />
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
          </View>
          <View style={styles.loaderContainer}>
            <Spinner color="gray" />
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 2,
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profileInitialized: state.profile.initialized,
  };
};

const mapDispatchToProps = {
  checkToken: () => checkToken(),
  getProfile: () => getProfile(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Boot);
