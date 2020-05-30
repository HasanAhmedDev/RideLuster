import {
    SS_ADDED_SUCCESSFUL,
    SS_ADDED_UNSUCCESSFUL
  } from '../actions/types';
  
  const initialState = {
    ss: null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SS_ADDED_SUCCESSFUL:
        return {
          ...state,
          ss: payload.servicestation
        };
      case SS_ADDED_UNSUCCESSFUL:
        return {
          ...state,
          ss: null
        };
      default:
        return state;
    }
  }
  