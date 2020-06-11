var INITIAL_STATE = {
  Name: null,
  matchId: null,
  UserId: null,
  Gender: '',
  profile_photo: null,
  Country: null,
  City: null,
  locale: '',
  distance: null,
  ConversationID: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'MATCH_NAME':
      return Object.assign({}, state, {Name: action.payload.Match_Name});
    case 'MATCH_ID':
      return Object.assign({}, state, {matchId: action.payload.Match_Id});
    case 'MATCH_GENDER':
      return Object.assign({}, state, {Gender: action.payload.Match_GENDER});
    case 'MATCH_USER_ID':
      return Object.assign({}, state, {UserId: action.payload.Match_USERID});
    case 'MATCH_PROFILE_PHOTO':
      return Object.assign({}, state, {
        profile_photo: action.payload.Match_PROFILE_PHOTO,
      });
    case 'MATCH_COUNTRY':
      return Object.assign({}, state, {Country: action.payload.Match_COUNTRY});
    case 'MATCH_CITY':
      return Object.assign({}, state, {City: action.payload.Match_CITY});
    case 'MATCH_LOCALE':
      return Object.assign({}, state, {locale: action.payload.Match_LOCALE});
    case 'MATCH_DISTANCE':
      return Object.assign({}, state, {
        distance: action.payload.Match_DISTANCE,
      });
    case 'CONVERSATION_ID':
      return Object.assign({}, state, {
        ConversationID: action.payload.ConversationId,
      });
    default:
      return state;
  }
};
