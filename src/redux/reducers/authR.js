import {
  SUCCESS,
  PROCESSING,
  PROCESSING_END,
  ERROR,
  CLEAR,
} from '../actions/authA';

var initial_state = {
  isAuthenticated: false,
  isProcessing: false,
  uid: null,
  authType: 'auth',
  username: null,
  role: 'user',
  hasError: false,
  errorCode: null,
  errorMessage: null,
};

export default (state = initial_state, action) => {
  //console.log('payload: ' + JSON.stringify(action));
  switch (action.type) {
    case PROCESSING:
      return {
        ...state,
        isProcessing: true,
        hasError: false,
        errorCode: null,
        errorMessage: null,
      };
    case PROCESSING_END:
      return {
        ...state,
        isProcessing: false,
      };
    case ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isProcessing: false,
        uid: null,
        username: null,
        hasError: true,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    case SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isProcessing: false,
        uid: action.payload.uid,
        username: action.payload.username,
        hasError: false,
        errorCode: null,
        errorMessage: null,
      };
    case CLEAR:
      return initial_state;
    default:
      return state;
  }
};
