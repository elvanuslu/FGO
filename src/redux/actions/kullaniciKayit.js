import store from '../store';

export const setUsrName = username => {
  store.dispatch({
    type: 'USER_NAME',
    payload: {
      username,
    },
  });
};

export const setUsrId = userId => {
  store.dispatch({
    type: 'USER_ID',
    payload: {
      userId,
    },
  });
};
export const setMailId = email => {
  store.dispatch({
    type: 'EMAIL_ID',
    payload: {
      email,
    },
  });
};
export const setTokenId = token => {
  store.dispatch({
    type: 'TOKEN_ID',
    payload: {
      token,
    },
  });
};
export const setGenderId = gender => {
  store.dispatch({
    type: 'GENDER',
    payload: {
      gender,
    },
  });
};
export const setCountryCode = country => {
  store.dispatch({
    type: 'COUNTRY_CODE',
    payload: {
      country,
    },
  });
};
export const setCIHAZID = id => {
  store.dispatch({
    type: 'CIHAZ_ID',
    payload: {
      id,
    },
  });
};
export const setOS = OS => {
  store.dispatch({
    type: 'OS',
    payload: {
      OS,
    },
  });
};
export const setLocale = locale => {
  store.dispatch({
    type: 'LOCALE',
    payload: {
      locale,
    },
  });
};
export const setLatitude = lat => {
  store.dispatch({
    type: 'LATITUDE',
    payload: {
      lat,
    },
  });
};
export const setLongitude = lon => {
  store.dispatch({
    type: 'LONGITUDE',
    payload: {
      lon,
    },
  });
};
export const setFullName = name => {
  store.dispatch({
    type: 'FULLNAME',
    payload: {
      name,
    },
  });
};
