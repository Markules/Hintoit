import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import items from './items';
import alert from './alert';
import users from './users';


export default combineReducers ({
    auth,
    profile,
    items,
    alert,
    users
});