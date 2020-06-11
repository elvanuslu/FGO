var INITIAL_STATE = {
  name: '',
  email: '',
  gender: 'm',
  slogan: '',
  registeredAt: '',
  birthday: '',
  city: '',
  countryCode: 'TUR',
  lat: '',
  lon: '',
  profilePhoto: '',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NAME':
      return Object.assign({}, state, {name: action.payload.name});
    case 'EMAIL':
      return Object.assign({}, state, {email: action.payload.email});
    case 'GENDER':
      return Object.assign({}, state, {gender: action.payload.gender});
    case 'SLOGAN':
      return Object.assign({}, state, {slogan: action.payload.slogan});
    case 'REGISTERED_AT':
      return Object.assign({}, state, {
        registeredAt: action.payload.registeredAt,
      });
    case 'BIRTHDAY':
      return Object.assign({}, state, {birthday: action.payload.birthday});
    case 'CITY':
      return Object.assign({}, state, {city: action.payload.city});
    case 'COUNTRY_CODE':
      return Object.assign({}, state, {
        countryCode: action.payload.countryCode,
      });
    case 'LAT':
      return Object.assign({}, state, {lat: action.payload.lat});
    case 'LON':
      return Object.assign({}, state, {lon: action.payload.lon});
    case 'PROFILE_PHOTO':
      return Object.assign({}, state, {
        profilePhoto: action.payload.profilePhoto,
      });
    default:
      return state;
  }
};
