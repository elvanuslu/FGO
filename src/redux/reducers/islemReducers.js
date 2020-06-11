import {TIKLANAN_FORM, SETTINGS, KART, RESIM} from '../actions/types';

const INITIAL_STATE = {
  settings: '',
  tiklananForm: '',
  kartBilgileri: [],
  resim: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIKLANAN_FORM:
      return {...state, tiklananForm: action.payload};
    case SETTINGS:
      return {...state, settings: action.payload};
    case KART:
      return {...state, kartBilgileri: action.payload};
    case RESIM:
      return {...state, resim: action.payload};

    default:
      return state;
  }
};
