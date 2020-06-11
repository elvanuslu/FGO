import store from '../store';

export const setUserName = username => {
  store.dispatch({
    type: 'USER_NAME',
    payload: {
      username,
    },
  });
};
export const setUserId = userId => {
  store.dispatch({
    type: 'USER_ID',
    payload: {
      userId,
    },
  });
};
export const setEmailId = email => {
  store.dispatch({
    type: 'EMAIL_ID',
    payload: {
      email,
    },
  });
};
export const setToken = token => {
  //console.log('tken: ', token);
  store.dispatch({
    type: 'TOKEN_ID',
    payload: {
      token,
    },
  });
};
export const setGender = gender => {
  store.dispatch({
    type: 'GENDER',
    payload: {
      gender,
    },
  });
};
export const setRole = role => {
  store.dispatch({
    type: 'ROLE',
    payload: {
      role,
    },
  });
};
