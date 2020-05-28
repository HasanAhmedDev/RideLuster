import axios from 'axios';
import {
    USER_AUTH_SUCCESSFUL,
    USER_AUTH_UNSUCCESSFUL
} from './types';
import setToken from '../utils/setToken';

export const authenticateUser = ( url, UserData ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try
    {
        const res = await axios.post(url, UserData, config);
        console.log(res);
        if(res.data){
            setToken(res.data.token);
            dispatch({
                type: USER_AUTH_SUCCESSFUL,
                payload: {
                    token: res.data.token,
                    isAuthenticated: true,
                }
            })
        }
    }
    catch(error)
    {
        console.log(error)
        setToken();
        dispatch({
            type: USER_AUTH_UNSUCCESSFUL,
            payload: {
                token: null,
                isAuthenticated: false,
            }
        })
    }
}


