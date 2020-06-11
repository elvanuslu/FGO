import {AsyncStorage, NetInfo} from 'react-native';
import {TIKLANAN_FORM} from './types';
import {SETTINGS, KART, RESIM} from './types';

export const getStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
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

export const settingsChanged = type => dispatch => {
  dispatch({
    type: SETTINGS,
    payload: type,
  });
};
