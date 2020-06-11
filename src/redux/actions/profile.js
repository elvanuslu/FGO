import store from '../store';

export const setUName = name => {
  store.dispatch({
    type: 'NAME',
    payload: {
      name,
    },
  });
};
export const setProfileEmail = email => {
  store.dispatch({
    type: 'EMAIL',
    payload: {
      email,
    },
  });
};
export const setProfileGender = gender => {
  store.dispatch({
    type: 'GENDER',
    payload: {
      gender,
    },
  });
};
export const setSlogan = slogan => {
  store.dispatch({
    type: 'SLOGAN',
    payload: {
      slogan,
    },
  });
};
export const setRegisteredAt = registeredAt => {
  store.dispatch({
    type: 'REGISTERED_AT',
    payload: {
      registeredAt,
    },
  });
};
export const setProfileBirthday = birthday => {
  store.dispatch({
    type: 'BIRTHDAY',
    payload: {
      birthday,
    },
  });
};
export const setProfileCITY = city => {
  store.dispatch({
    type: 'CITY',
    payload: {
      city,
    },
  });
};
export const setProfileCountryCode = countryCode => {
  store.dispatch({
    type: 'COUNTRY_CODE',
    payload: {
      countryCode,
    },
  });
};

export const setLatLon = lat => {
  store.dispatch({
    type: 'LAT',
    payload: {
      lat,
    },
  });
};
export const setLonLat = lon => {
  store.dispatch({
    type: 'LON',
    payload: {
      lon,
    },
  });
};
export const setProfilePhoto = profilePhoto => {
  store.dispatch({
    type: 'PROFILE_PHOTO',
    payload: {
      profilePhoto,
    },
  });
};
