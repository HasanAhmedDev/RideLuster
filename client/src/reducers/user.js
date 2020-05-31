import {
    FETCH_SS_SUCCESSFULL,
    FETCH_SS_UNSUCCESSFULL
} from '../actions/types'

const initialState = {
    docs: [],
    totaldocs: null,
    page: null,
    totalpages: null,
    hasnext: null,
    nextpage: null,
    hasprev: null,
    prevpage: null
}

export default function (state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case FETCH_SS_SUCCESSFULL:
            return {
                ...state,
                ...payload
            }

        case FETCH_SS_UNSUCCESSFULL:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}