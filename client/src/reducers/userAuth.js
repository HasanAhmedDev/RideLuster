import {
  USER_AUTH_SUCCESSFUL,
  USER_AUTH_UNSUCCESSFUL,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('Token'),
  isAuthenticated: null,
  loading: true,
  userType: localStorage.getItem('userType'),
  user: null,
  admin: null,
  vendor: null,
};

export default function (state = initialState, action) {
  const { type, payload, userType } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_AUTH_SUCCESSFUL:
      localStorage.setItem('Token', payload.token);
      localStorage.setItem('userType', userType);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        userType: userType,
      };
    case USER_AUTH_UNSUCCESSFUL:
    case AUTH_ERROR:
      localStorage.removeItem('Token');
      localStorage.removeItem('userType');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        userType: null,
        user: null,
        admin: null,
        vendor: null,
      };
    default:
      return state;
  }
}
