import {
    combineReducers
} from 'redux'
import alert from './alert'
import userAuth from './userAuth'
export default combineReducers({
    alert,
    userAuth
})