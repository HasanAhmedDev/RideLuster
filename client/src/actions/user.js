import {
    FETCH_SS_SUCCESSFULL,
    FETCH_SS_UNSUCCESSFULL,
    GET_ALL_SS_SUCCESSFULL,
    GET_ALL_SS_UNSUCCESSFULL,
    OPEN_USER_SOCKET,
    GET_COMPLETED_SERVICES_SUCCESSFULL,
    GET_COMPLETED_SERVICES_UNSUCCESSFULL,
    // BOOK_SERVICE_SUCCESSFULL,
    // BOOK_SERVICE_UNSUCCESSFULL
} from './types';
import axios from 'axios';
import openSocket from 'socket.io-client';
import {
    setAlert
} from '../actions/alert';
import {
    showLoader
} from './loader';

export const searchServiceStation = ({area, page}) => dispatch => {
    axios.post('http://localhost:5000/api/auth/user/searchservicestation/', {
        area,
        page
    }).then((res) => {
       
        dispatch({
            type: FETCH_SS_SUCCESSFULL,
            payload: res.data
        })
        dispatch(showLoader(false));
    }).catch((err) => {
        console.log(err.message);
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        }
        dispatch(showLoader(false));
        dispatch({
            type: FETCH_SS_UNSUCCESSFULL,
        })

    })
}

export const getAllServiceStation = () => dispatch => {
    axios.get('http://localhost:5000/api/users/getareas').then((res)=>{
        dispatch({
            type: GET_ALL_SS_SUCCESSFULL,
            payload: res.data
        })
        dispatch(showLoader(false));
    }).catch((err)=>{
        console.log(err.message);
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        }
        dispatch(showLoader(false));
        dispatch({
            type: GET_ALL_SS_UNSUCCESSFULL
        })
    })
}

export const openSocketConnectionUser = (clientID) => dispatch => {
    const clientio = openSocket('http://localhost:5000');
      clientio.emit('client', {
        clientID : clientID,
        msg: "Hi I am client with ID : "
      })
    dispatch({
        type: OPEN_USER_SOCKET,
        payload: clientio
    })
}

export const getCompletedServices = () => dispatch => {
    axios.get('http://localhost:5000/api/auth/user/getcompletedbookings').then((res)=>{
        dispatch({
            type: GET_COMPLETED_SERVICES_SUCCESSFULL,
            payload: res.data
        })
        dispatch(showLoader(false));
    }).catch((err)=>{
        console.log(err.message);
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        }
        dispatch({
            type: GET_COMPLETED_SERVICES_UNSUCCESSFULL
        })
        dispatch(showLoader(false));
    })
}

export const bookService = (booking) => dispatch => {
    axios.post('http://localhost:5000/api/auth/user/bookService',booking).then((res) => {
        dispatch(setAlert(res.data.msg, 'success'));
        return;
    }).catch((err) => {
        console.log(err.message);
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        }
        dispatch(showLoader(false));
        return;
    })
}