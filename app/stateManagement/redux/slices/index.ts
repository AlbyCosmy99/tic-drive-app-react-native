import {combineReducers} from 'redux';
import authReducer from './authSlice';
import servicesReducer from './servicesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
});

export default rootReducer;
