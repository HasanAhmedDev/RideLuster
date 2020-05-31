import { SHOW_LOADER } from './types'

export const showLoader = (bool) => dispatch => {
    dispatch({
        type: SHOW_LOADER,
        show: bool
    })
}