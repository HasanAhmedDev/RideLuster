import {
    combineReducers
} from 'redux'
import alert from './alert'
import userAuth from './userAuth';
import admin from './admin'
import vendor from './vendor'
export default combineReducers({
    alert,
    userAuth,
    admin,
    vendor
})