import {
    SS_ADDED_SUCCESSFUL,
    SS_ADDED_UNSUCCESSFUL,
    GET_SS_SUCCESSFULL,
    GET_SS_UNSUCCESSFULL
  } from '../actions/types';
  
  const initialState = {
    ss: null,
    ssLoaded: false
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SS_ADDED_SUCCESSFUL:
        return {
          ...state,
          ss: payload.servicestation,
        };
      case GET_SS_SUCCESSFULL:
        return {
          ...state,
          ss: payload.servicestation,
          ssLoaded: true
        }
      case GET_SS_UNSUCCESSFULL:
      case SS_ADDED_UNSUCCESSFUL:
        return {
          ...state,
          ss: null,
          ssLoaded: true
        };
      default:
        return state;
    }
  }
  