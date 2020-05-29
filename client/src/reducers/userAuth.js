import {
    USER_AUTH_SUCCESSFUL,
    USER_AUTH_UNSUCCESSFUL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('Token'),
    isAuthenticated: localStorage.getItem('Token') ? true : false,
    type: null,
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action
    switch (type) {
        case USER_AUTH_SUCCESSFUL:
            return payload;
        case USER_AUTH_UNSUCCESSFUL:
            return payload;
        default:
            return state
    }
}