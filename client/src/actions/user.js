import {
    FETCH_SS_SUCCESSFULL,
    FETCH_SS_UNSUCCESSFULL
} from './types';
import axios from 'axios';
import {
    setAlert
} from '../actions/alert';
import {
    showLoader
} from './loader';

export const searchServiceStation = (area, page) => dispatch => {
    axios.post('http://localhost:5000/api/auth/user/searchservicestation/', {
        area,
        page
    }).then((res) => {
        dispatch({
            type: FETCH_SS_SUCCESSFULL,
            payload: res.data
        })
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