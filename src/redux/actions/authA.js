import AsyncStorage from '@react-native-community/async-storage';
import {setStorage, getStorage, postlogin, checkToken as ApiCheckToken} from '../../../service/service';
import {clearProfile} from './profileA';
import {Connect, CloseConnection} from '../../../Component/client';

export const SUCCESS = 'SUCCESS';
export const PROCESSING = 'PROCESSING';
export const PROCESSING_END = 'PROCESSING_END';
export const ERROR = 'ERROR';
export const CLEAR = 'CLEAR';

const dProcessing = () => {
  return {
    type: PROCESSING,
  };
};

const dProcessingEnd = () => {
  return {
    type: PROCESSING_END,
  };
};

const dSuccess = payload => {
  return {
    type: SUCCESS,
    payload,
  };
};

const dError = payload => {
  return {
    type: ERROR,
    payload,
  };
};

const dClear = () => {
  return {
    type: CLEAR,
  };
};

export function login(username, password) {
  return async dispatch => {
    dispatch(dProcessing());
    if (!username || !password) {
      dispatch(dProcessingEnd());
      dispatch(
        dError({
          errorCode: 'EMPTY_FIELDS',
          errorMessage: 'Lütfen kullanıcı bilgilerinizi eksiksiz giriniz',
        }),
      );
      return false;
    }

    const loginResult = await postlogin(username, password).catch(() => {
      dispatch(
        dError({
          errorCode: 'SYSTEM_ERROR',
          errorMessage: 'System error occured',
        }),
      );
      return false;
    });

    if (!loginResult.status) {
      dispatch(
        dError({
          errorCode: loginResult.error_code,
          errorMessage: loginResult.error_message,
        }),
      );
      return false;
    }

    if (loginResult.status) {
      await setStorage('token', loginResult.data.token);
      await setStorage('uid', loginResult.data.payload.id);
      const parsedData = {
        uid: loginResult.data.payload.id,
        username: loginResult.data.payload.username,
      };
      await Connect();
      dispatch(dSuccess(parsedData));
      return parsedData;
    }
  };
}

export function setAutoLogin(payload, token) {
  return async dispatch => {
    if (!payload.uid || !payload.username) {
      return false;
    }
    await setStorage('token', token);
    await setStorage('uid', payload.uid);
    await Connect();
    dispatch(dSuccess(payload));
    return true;
  };
}

export function checkToken() {
  return async dispatch => {
    dispatch(dProcessing());
    const token = await getStorage('token');
    const uid = await getStorage('uid');
    if (token == null || uid == null) {
      dispatch(
        dError({
          errorCode: 'EMPTY_TOKEN',
          errorMessage: null,
        }),
      );
      return false;
    }
    const apiCheckToken = await ApiCheckToken().catch(() => {
      dispatch(
        dError({
          errorCode: 'TOKEN_ERROR',
          errorMessage: null,
        }),
      );
      return false;
    });
    if (!apiCheckToken.status) {
      dispatch(
        dError({
          errorCode: apiCheckToken.error_code,
          errorMessage: apiCheckToken.error_message,
        }),
      );
      return false;
    }

    const parsedData = {
      uid: apiCheckToken.data.payload.id,
      username: apiCheckToken.data.payload.username,
    };
    await Connect();
    dispatch(dSuccess(parsedData));
    return true;
  };
}

export function logout() {
  return async dispatch => {
    await AsyncStorage.removeItem('token').catch(() => false);
    await CloseConnection();
    dispatch(dClear());
    dispatch(clearProfile());
    return true;
  };
}
