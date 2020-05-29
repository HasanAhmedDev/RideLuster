import axios from 'axios';
import {
  USER_AUTH_SUCCESSFUL,
  USER_AUTH_UNSUCCESSFUL,
  USER_LOADED,
  AUTH_ERROR,
} from './types';
import setToken from '../utils/setToken';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from '../actions/alert';

export const loadUser = () => async (dispatch) => {
    console.log("LOAD USERS")
  if (localStorage.Token) {
    setAuthToken(localStorage.Token);
  }
  let url;
  switch (localStorage.userType) {
    case 'vendor':
      url = '/api/auth/vendor';
      break;
    case 'admin':
      url = '/api/auth/admin';
      break;
    default:
      url = '/api/auth/user';
      break;
  }
  try {
    const res = await axios.get(url);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const authenticateUser = (url, UserData, userType) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(url, UserData, config)
    .then((res) => {
      console.log(res);
      if (res.data) {
        dispatch({
          type: USER_AUTH_SUCCESSFUL,
          payload: res.data,
          userType: userType,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        
      }
      dispatch({
        type: USER_AUTH_UNSUCCESSFUL,
      });
    });
};
