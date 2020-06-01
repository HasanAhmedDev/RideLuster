import {
    FETCH_SS_SUCCESSFULL,
    FETCH_SS_UNSUCCESSFULL,
    GET_ALL_SS_SUCCESSFULL,
    GET_ALL_SS_UNSUCCESSFULL,
    OPEN_USER_SOCKET
} from '../actions/types'

const initialState = {
    docs: [],
    totaldocs: null,
    page: null,
    totalpages: null,
    hasnext: null,
    nextpage: null,
    hasprev: null,
    prevpage: null,
    areas: [],
    userSocket: null
}

export default function (state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case FETCH_SS_SUCCESSFULL:
            return {
                ...state,
                ...payload
            }
        case GET_ALL_SS_SUCCESSFULL:
            return {
                ...state,
                areas: payload.areas
            }
        case OPEN_USER_SOCKET:
            return{
                ...state,
                userSocket: payload
            }
        case GET_ALL_SS_UNSUCCESSFULL:
        case FETCH_SS_UNSUCCESSFULL:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}