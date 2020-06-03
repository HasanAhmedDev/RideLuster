import axios from 'axios'
import {
    GET_REQUEST_SUCCESSFULL,
    GET_REQUEST_UNSUCCESSFULL,
    GET_APPROVED_SS_SUCCESSFULL,
    GET_APPROVED_SS_UNSUCCESSFULL,
    GET_REGISTERED_USERS_SUCCESSFULL,
    GET_REGISTERED_USERS_UNSUCCESSFULL
} from './types'
import setAuthToken from '../utils/setAuthToken';
import {
    setAlert
} from '../actions/alert';


export const loadRequests = () => async (dispatch) => {
    if (localStorage.Token) {
        setAuthToken(localStorage.Token);
    }
    try {
        axios.get('/api/auth/admin/getallrequests').then((res)=>{
            console.log(res);
            dispatch({
                type: GET_REQUEST_SUCCESSFULL,
                payload: res.data,
            });
        }).catch((err)=>{
            console.log(err);
            return;
        })
        
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_REQUEST_UNSUCCESSFULL
        });
    }

}


export const loadSS = () => async (dispatch) => {
    if (localStorage.Token) {
        setAuthToken(localStorage.Token);
    }
    try {
        const res = await axios.get('/api/auth/admin/getservicestations')
        dispatch({
            type: GET_APPROVED_SS_SUCCESSFULL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_APPROVED_SS_UNSUCCESSFULL
        });
    }

}

export const loadUsers=()=>async dispatch=>{
    if (localStorage.Token) {
        setAuthToken(localStorage.Token);
    }
    try {
        const res = await axios.get('/api/auth/admin/getusers')
        dispatch({
            type: GET_REGISTERED_USERS_SUCCESSFULL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_REGISTERED_USERS_UNSUCCESSFULL
        });
    }
}