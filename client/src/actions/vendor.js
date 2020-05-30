import axios from 'axios';
import {
  SS_ADDED_SUCCESSFUL,
  SS_ADDED_UNSUCCESSFUL
} from './types';
import { setAlert } from '../actions/alert';


export const addServiceStation = (url, UserData, token) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
  };

  axios
    .post(url, UserData, config)
    .then((res) => {
      console.log(res);
      if (res.data) {
        dispatch({
          type: SS_ADDED_SUCCESSFUL,
          payload: res.data,
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
        type: SS_ADDED_UNSUCCESSFUL,
      });
    });
};
