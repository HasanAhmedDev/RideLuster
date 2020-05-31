import { SHOW_LOADER } from '../actions/types';

const initialState = {
    loader: false
}

export default function (state = initialState, action){
    const { type, show } = action;
    if(type === SHOW_LOADER)
    return {
        ...state,
        loader: show
    }
    return state;
}