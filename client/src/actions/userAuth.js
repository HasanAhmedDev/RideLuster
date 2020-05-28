import axios from 'axios';
import {
    USER_AUTH_SUCCESSFUL,
    USER_AUTH_UNSUCCESSFUL
} from './types';
import setToken from '../utils/setToken';

export const authenticateUser = ( url, UserData ) => dispatch => {
    console.log(UserData);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post(url, UserData, config).then((res)=>{
        console.log(res);

        if(res.data){
            setToken(res.data.token);
            return dispatch({
                type: USER_AUTH_SUCCESSFUL,
                payload: {
                    token: res.data.token,
                    isAuthenticated: true,
                }
            })
        }
    }).catch((err)=>{
        console.log(err);
        return dispatch({
            type: USER_AUTH_UNSUCCESSFUL,
            payload: {
                token: null,
                isAuthenticated: false,
            }
        })
    })
    
    
}


