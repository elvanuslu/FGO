import store from '../store';

export const setWS = Ws => {
  store.dispatch({
    type: 'WS',
    payload: {
      Ws,
    },
  });
};

export const setMatch = matchId => {
  store.dispatch({
    type: 'MATCH',
    payload: {
      matchId,
    },
  });
};

export const setBaglantiDurum = durum => {
  store.dispatch({
    type: 'DURUM',
    payload: {
      durum,
    },
  });
};
export const setRoom = roomId => {
  store.dispatch({
    type: 'Room_Created',
    payload: {
      roomId,
    },
  });
};

export const setIncomingMessage = message => {
  store.dispatch({
    type: 'Incoming_Message',
    payload: {
      message,
    },
  });
};
export const setuserOffline = userOffline => {
  store.dispatch({
    type: 'User_Gone_Offline',
    payload: {
      userOffline,
    },
  });
};
export const setRejectedMatching = rejectId => {
  store.dispatch({
    type: 'Party_Rejected_Matching',
    payload: {
      rejectId,
    },
  });
};
export const setAuthenticated = auth => {
  store.dispatch({
    type: 'Authenticated',
    payload: {
      auth,
    },
  });
};
