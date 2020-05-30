import axios from 'axios';
import {
  SS_ADDED_SUCCESSFUL,
  SS_ADDED_UNSUCCESSFUL,
  GET_SS_SUCCESSFULL,
  GET_SS_UNSUCCESSFULL
} from './types';
import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';


export const addServiceStation = (url, UserData, token) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  setAuthToken(token);
  axios
    .post(url, UserData, config)
    .then((res) => {
      if (res.data) {
        dispatch({
          type: SS_ADDED_SUCCESSFUL,
          payload: res.data,
        });
        dispatch(getServiceStation());
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

export const getServiceStation = () => dispatch => {  
  axios.get('http://localhost:5000/api/auth/vendor/getservicestation').then((res)=>{
    dispatch({
      type: GET_SS_SUCCESSFULL,
      payload: res.data
    })
  }).catch((err)=>{
    dispatch({
      type: GET_SS_UNSUCCESSFULL,
    })
    console.log(err);
  })

}