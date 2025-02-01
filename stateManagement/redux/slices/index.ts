import {combineReducers} from 'redux';
import authReducer from './authSlice';
import servicesReducer from './servicesSlice';
import workshopsReducer from './workshopsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  workshops: workshopsReducer
});

export default rootReducer;
