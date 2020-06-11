var INITIAL_STATE = {
  WS: null,
  Match: null,
  BaglantiDurumu: null,
  Room: null,
  Mesaj: null,
  Reject: null,
  Offline: null,
  Auth: null,
};

export default (state = INITIAL_STATE, action) => {
  //console.log('tip: ', action.type);
  switch (action.type) {
    case 'WS':
      return Object.assign({}, state, {WS: action.payload.Ws});
    case 'MATCH':
      return Object.assign({}, state, {Match: action.payload.matchId});
    case 'DURUM':
      return Object.assign({}, state, {BaglantiDurumu: action.payload.durum});
    case 'Room_Created':
      return Object.assign({}, state, {Room: action.payload.roomId});
    case 'Incoming_Message':
      return Object.assign({}, state, {Mesaj: action.payload.message});
    case 'Party_Rejected_Matching':
      return Object.assign({}, state, {Reject: action.payload.rejectId});
    case 'User_Gone_Offline':
      return Object.assign({}, state, {Offline: action.payload.userOffline});
    case 'Authenticated':
      return Object.assign({}, state, {Auth: action.payload.auth});
    default:
      return state;
  }
};
