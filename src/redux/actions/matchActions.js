import store from '../store';

export const setMATCH_NAME = Match_Name => {
  store.dispatch({
    type: 'MATCH_NAME',
    payload: {
      Match_Name,
    },
  });
};
export const setMATCH_ID = Match_Id => {
  store.dispatch({
    type: 'MATCH_ID',
    payload: {
      Match_Id,
    },
  });
};
export const setUSER_ID = Match_USERID => {
  store.dispatch({
    type: 'MATCH_USER_ID',
    payload: {
      Match_USERID,
    },
  });
};
export const setMATCH_GENDER = Match_GENDER => {
  store.dispatch({
    type: 'MATCH_GENDER',
    payload: {
      Match_GENDER,
    },
  });
};
export const setMATCH_PROFILE_PHOTO = Match_PROFILE_PHOTO => {
  store.dispatch({
    type: 'MATCH_PROFILE_PHOTO',
    payload: {
      Match_PROFILE_PHOTO,
    },
  });
};
export const setMATCH_COUNTRY = Match_COUNTRY => {
  store.dispatch({
    type: 'MATCH_COUNTRY',
    payload: {
      Match_COUNTRY,
    },
  });
};
export const setMATCH_CITY = Match_CITY => {
  store.dispatch({
    type: 'MATCH_CITY',
    payload: {
      Match_CITY,
    },
  });
};
export const setMATCH_LOCALE = Match_LOCALE => {
  store.dispatch({
    type: 'MATCH_LOCALE',
    payload: {
      Match_LOCALE,
    },
  });
};
export const setMATCH_DISTANCE = Match_DISTANCE => {
  store.dispatch({
    type: 'MATCH_DISTANCE',
    payload: {
      Match_DISTANCE,
    },
  });
};
export const setCONVERSATIONID = ConversationId => {
  store.dispatch({
    type: 'CONVERSATION_ID',
    payload: {
      ConversationId,
    },
  });
};
