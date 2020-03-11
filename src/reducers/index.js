import { combineReducers } from 'redux';
import taskReducer from './task';
import userReducer from './user';
import signInReducer from './signIn';

export default combineReducers({
    taskData: taskReducer,
    userData: userReducer,
    signInData: signInReducer
});

