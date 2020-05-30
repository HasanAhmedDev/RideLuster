import {
    combineReducers
} from 'redux'
import alert from './alert'
import userAuth from './userAuth';
import admin from './admin'
export default combineReducers({
    alert,
    userAuth,
    admin
})