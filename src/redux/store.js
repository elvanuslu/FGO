import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

//import userReducers from './reducers/userReducers';
import kullaniciKayit from './reducers/kullaniciKayit';
//import profileReducers from './reducers/profileReducers';
import SockReducer from './reducers/SockReducer';
import matchReducer from './reducers/matchReducer';
import authR from './reducers/authR';
import profileR from './reducers/profileR';

const reducersCombined = combineReducers({
  auth: authR,
  profile: profileR,
  // user: userReducers,
  kullaniciKayit: kullaniciKayit,
  // profile: profileReducers,
  sock: SockReducer,
  match: matchReducer,
});

let store = null;
if (__DEV__) {
  store = createStore(
    reducersCombined,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );
} else {
  store = createStore(
    reducersCombined,
    compose(
      applyMiddleware(thunk),
    ),
  );
}

console.log('STORE', store.getState());
export default store;
