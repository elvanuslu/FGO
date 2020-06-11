/* eslint-disable react-hooks/rules-of-hooks */
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Toast,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export const hasLocationPermissions = async () => {
  if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    return true;
  }
  // var PermissionRequests =  PermissionRequest();
  //console.log('PermissionRequest: '+PermissionRequests)
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Toast.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Toast.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
};

export const getLocation = async () => {
  let positions = '';
  const hasLocationPermission = await hasLocationPermissions();
/*
  if (!hasLocationPermission) {
    Alert.alert(
      'Konum İzni Gerekiyor',
      'Cihazınızdan  konum izni vermelisiniz.',
      [
        {
          text: 'Tamam',
          onPress: () => {
            ''; // this.props.navigation.navigate('hesabim');
          },
        },
      ],
      {cancelable: true},
    );
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      positions = JSON.stringify(position.coords, null, 4);
      console.log('positions = ' + positions + ' -- ' + new Date());
    },
    error => {
      console.log('Error:' + error);
    },
    {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 10000,
      distanceFilter: 50,
      forceRequestLocation: true,
    },
  );

  console.log('pos = ' + positions + ' - ' + new Date());
  return positions;
  */
};

export const getLocationUpdates = async () => {
  const hasLocationPermission = await this.hasLocationPermissions();

  if (!hasLocationPermission) {
    return;
  }
  Geolocation.watchPosition(
    position => {
      console.log('Update Konumlar: ' + JSON.stringify(position));
      return position;
    },
    error => {
      console.log('Update Position Error: ' + error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 0,
      interval: 5000,
      fastestInterval: 2000,
    },
  );
};

export const removeLocationUpdates = () => {
  if (this.watchId !== null) {
    Geolocation.clearWatch(this.watchId);
    this.setState({loading: false});
  }
};
