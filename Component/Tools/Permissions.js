import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export async function requestLocationPermission() {
  return new Promise(resolve => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(cResult => {
      switch (cResult) {
        case RESULTS.GRANTED:
          resolve(true);
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(rResult => {
            resolve(rResult === RESULTS.GRANTED);
          });
          break;
        default:
          resolve(false);
          break;
      }
    });
  });
}
