import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import items from './items';
import alert from './alert';


export default combineReducers ({
    auth,
    profile,
    items,
    alert
});