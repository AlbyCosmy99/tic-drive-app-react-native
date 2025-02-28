import {combineReducers} from 'redux';
import authReducer from './authSlice';
import servicesReducer from './servicesSlice';
import workshopsReducer from './workshopsSlice';
import carsReducer from './carsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  workshops: workshopsReducer,
  cars: carsReducer,
});

export default rootReducer;
