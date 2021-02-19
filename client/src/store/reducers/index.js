import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import items from './items';

export default combineReducers ({
    auth,
    profile,
    items,
});