import axios from 'axios';
import {
  SS_ADDED_SUCCESSFUL,
  SS_ADDED_UNSUCCESSFUL,
  GET_SS_SUCCESSFULL,
  GET_SS_UNSUCCESSFULL,
  OPEN_VENDOR_SOCKET,
  GET_UNHANDLED_REQUEST_SUCCESSFULL,
  GET_UNHANDLED_REQUEST_UNSUCCESSFULL,
  HANDLE_BOOKING_REQUEST_SUCCESSFULL,
  GET_COMPLETED_SERVICES_SS
} from './types';
import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';
import openSocket from 'socket.io-client';
import { showLoader } from './loader';

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
      dispatch(showLoader(false));
    });
};

export const getServiceStation = () => dispatch => {  
  axios.get('http://localhost:5000/api/auth/vendor/getservicestation').then((res)=>{
    dispatch({
      type: GET_SS_SUCCESSFULL,
      payload: res.data
    })
      dispatch(showLoader(false));
  }).catch((err)=>{
    console.log(err.message);
      const errors = err.response.data.errors;
      
    dispatch({
      type: GET_SS_UNSUCCESSFULL,
    })
    dispatch(showLoader(false));
  })

}

export const openSocketVendor = (id) => dispatch =>{
  const vendorio = openSocket('http://localhost:5000');
  vendorio.emit('vendor', {
      vendorID: id,
      msg: "Hi I am Vendor"
  });
  dispatch({
    type: OPEN_VENDOR_SOCKET,
    payload: vendorio
  })
}

export const GetUnhandledRequest = (id) => dispatch => {
  console.log(id);
  axios.post('http://localhost:5000/api/auth/vendor/getUnhandledBookings',id).then((res)=> {
    console.log("GET", res);
    dispatch({
      type: GET_UNHANDLED_REQUEST_SUCCESSFULL,
      payload: res.data
    })
    dispatch(showLoader(false));
  }).catch((err)=>{
    console.log(err.message);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch(showLoader(false));
      dispatch({
        type: GET_UNHANDLED_REQUEST_UNSUCCESSFULL
      })
  })
}

export const handleBookingRequest = (payload) => dispatch => {
  axios.post('http://localhost:5000/api/auth/vendor/handleRequest', payload).then((res)=>{
    console.log(res);
  dispatch({
    type: HANDLE_BOOKING_REQUEST_SUCCESSFULL,
    payload: res.data
  })
  dispatch(setAlert(res.data.msg, 'success'));
  dispatch(GetUnhandledRequest({id: payload.id}));
  dispatch(getServiceStation())
  }).catch((err)=>{
    console.log(err.message);
      // const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch(showLoader(false));
      return;
  })
}

export const updateProcess = (data) => dispatch =>{
  axios.post('http://localhost:5000/api/auth/vendor/updateProcess', data).then((res)=>{
    console.log(res)
    dispatch(getServiceStation());
    return;

  }).catch((err)=>{
    console.log(err);
    console.log(err.message);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch(showLoader(false));
      return ;
  })
}

export const getCompletedServicesSS = () => dispatch =>{
  axios.get('http://localhost:5000/api/auth/vendor/getcompletedbookings').then((res)=>{
    console.log(res);
    dispatch({
      type: GET_COMPLETED_SERVICES_SS,
      payload: res.data
    })
    dispatch(showLoader(false));
  }).catch((err)=>{
    console.log(err);
    console.log(err.message);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch(showLoader(false));
      return ;
  })
}

export const closeSS = () => dispatch =>{
  axios.put('http://localhost:5000/api/auth/vendor/closeservicestation').then((res)=>{
    console.log(res);
    dispatch(showLoader(false));
    return;
  }).catch((err)=>{
    console.log(err);
    console.log(err.message);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch(showLoader(false));
      return ;
  })
}