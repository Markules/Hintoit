import { combineReducers } from 'redux';
import authReducer from '../../containers/Auth/store/reducers/auth';
import profileReducer from '../../containers/Profile/store/reducers/profile';
import itemsReducer from '../../components/Items/store/reducers/items';

export default combineReducers ({
    auth: authReducer,
    profile: profileReducer,
    items: itemsReducer,


});