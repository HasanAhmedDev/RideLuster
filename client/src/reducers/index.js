import {
    combineReducers
} from 'redux'
import alert from './alert'
import userAuth from './userAuth';
import admin from './admin'
import vendor from './servicestation'
import loader from './loader';
import user from './user';
export default combineReducers({
    alert,
    userAuth,
    admin,
    vendor,
    loader,
    user
})