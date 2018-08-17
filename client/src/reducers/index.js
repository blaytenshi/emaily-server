import { combineReducers } from 'redux';
import authReducer from './authReducer';

// whatever keys we provide to the combineReducers function is the keys in the central state object
export default combineReducers({
    auth: authReducer
})