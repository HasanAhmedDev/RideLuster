import {
    combineReducers
} from 'redux'
import alert from './alert'
import userAuth from './userAuth';
import vendor from './vendor'
export default combineReducers({
    alert,
    userAuth,
    vendor
})