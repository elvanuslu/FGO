import {
  SET_PROFILE,
  SET_BIRTHDAY,
  SET_EMAIL,
  SET_NAME,
  SET_LOCATION,
  SET_ABOUT_ME,
  SET_OCCUPATION,
  GALLERY_ADD_PHOTO,
  GALLERY_REMOVE_PHOTO,
  GALLERY_SELECT_PHOTO,
  CLEAR,
} from '../actions/profileA';
import {PROCESSING, PROCESSING_END} from '../actions/authA';

var initial_state = {
  initialized: false,
  isProcessing: false,
  email: null,
  name: null,
  gender: null,
  registeredAt: null,
  birthday: null,
  age: null,
  city: null,
  countryCode: null,
  profilePhoto: null,
  lat: null,
  long: null,
  aboutMe: null,
  occupation: null,
  gallery: [],
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case PROCESSING:
      return {
        ...state,
        isProcessing: true,
      };
    case PROCESSING_END:
      return {
        ...state,
        isProcessing: false,
      };
    case SET_PROFILE:
      return {
        initialized: true,
        isProcessing: false,
        ...action.payload,
      };
    case SET_BIRTHDAY:
      return {
        ...state,
        isProcessing: false,
        birthday: action.payload.birthday,
        age: action.payload.age,
      };
    case SET_EMAIL:
      return {
        ...state,
        isProcessing: false,
        email: action.payload.email,
      };
    case SET_NAME:
      return {
        ...state,
        isProcessing: false,
        name: action.payload.name,
      };
    case SET_LOCATION:
      return {
        ...state,
        isProcessing: false,
        city: action.payload.city,
        countryCode: action.payload.countryCode,
        lat: action.payload.lat,
        long: action.payload.long,
      };
    case SET_ABOUT_ME:
      return {
        ...state,
        isProcessing: false,
        aboutMe: action.payload.aboutMe,
      };
    case SET_OCCUPATION:
      return {
        ...state,
        isProcessing: false,
        occupation: action.payload.occupation,
      };
    case GALLERY_ADD_PHOTO:
      return {
        ...state,
        isProcessing: false,
        gallery: [...state.gallery, action.payload],
      };
    case GALLERY_REMOVE_PHOTO:
      return {
        ...state,
        isProcessing: false,
        gallery: state.gallery.filter(item => item.id !== action.payload.id),
      };
    case GALLERY_SELECT_PHOTO:
      return {
        ...state,
        isProcessing: false,
        profilePhoto: action.payload.medium,
        gallery: state.gallery.map(item => {
          if (item.id === action.payload.id) {
            return {...item, isProfilePhoto: true};
          } else {
            return {...item, isProfilePhoto: false};
          }
        }),
      };
    case CLEAR:
      return initial_state;
    default:
      return state;
  }
};
