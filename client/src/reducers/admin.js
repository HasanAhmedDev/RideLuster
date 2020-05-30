import {
    GET_REQUEST_SUCCESSFULL,
    GET_REQUEST_UNSUCCESSFULL,
    GET_APPROVED_SS_SUCCESSFULL,
    GET_APPROVED_SS_UNSUCCESSFULL,
    GET_REGISTERED_USERS_SUCCESSFULL,
    GET_REGISTERED_USERS_UNSUCCESSFULL
} from '../actions/types';

const initialState = {
    ssRequests: null,
    servicestations: null,
    users:null
};

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_REQUEST_SUCCESSFULL:
        case GET_APPROVED_SS_SUCCESSFULL:
        case GET_REGISTERED_USERS_SUCCESSFULL:
            return {
                ...state,
                ...payload,
            };
        case GET_APPROVED_SS_UNSUCCESSFULL:
        case GET_REQUEST_UNSUCCESSFULL:
        case GET_REGISTERED_USERS_UNSUCCESSFULL:
            return {
                ...state,
                ssRequests: null,
                servicestations: null,
                users:null,
                success: false
            };

        default:
            return state;
    }
}