var INITIAL_STATE = {
  username: 'test',
  userId: '0',
  email: '-',
  token: '0',
  gender: 'm',
  CountryCode: '',
  CihazUniqueId: '',
  Os: 'IOS',
  locale: '',
  latitude: '',
  longitude: '',
  FullName: '',
};

export default (state = INITIAL_STATE, action) => {
 // console.log('payload: ' + JSON.stringify(action));
  switch (action.type) {
    case 'USER_NAME':
      return Object.assign({}, state, {username: action.payload.username});
    case 'USER_ID':
      return Object.assign({}, state, {userId: action.payload.userId});
    case 'EMAIL_ID':
      return Object.assign({}, state, {email: action.payload.email});
    case 'TOKEN_ID':
      return Object.assign({}, state, {token: action.payload.token});
    case 'GENDER':
      return Object.assign({}, state, {gender: action.payload.gender});
    case 'COUNTRY_CODE':
      return Object.assign({}, state, {
        CountryCode: action.payload.CountryCode,
      });
    case 'CIHAZ_ID':
      return Object.assign({}, state, {
        CihazUniqueId: action.payload.CihazUniqueId,
      });
    case 'OS':
      return Object.assign({}, state, {Os: action.payload.Os});
    case 'LOCALE':
      return Object.assign({}, state, {locale: action.payload.locale});
    case 'LATITUDE':
      return Object.assign({}, state, {latitude: action.payload.latitude});
    case 'LONGITUDE':
      return Object.assign({}, state, {longitude: action.payload.longitude});
    case 'FULLNAME':
      return Object.assign({}, state, {FullName: action.payload.fullname});
    default:
      return state;
  }
};
