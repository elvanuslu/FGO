var INITIAL_STATE = {
  username: 'elvan',
  userId: '0',
  email: '-',
  token: '0',
  gender: 'm',
  role: 'user',
};

export default (state = INITIAL_STATE, action) => {
  //console.log('payload: ' + JSON.stringify(action));
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
    case 'ROLE':
      return Object.assign({}, state, {role: action.payload.role});
    default:
      return state;
  }
};
