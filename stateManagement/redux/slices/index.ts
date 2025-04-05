import {combineReducers} from 'redux';
import authReducer from './authSlice';
import servicesReducer from './servicesSlice';
import workshopsReducer from './workshopsSlice';
import carsReducer from './carsSlice';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  workshops: workshopsReducer,
  cars: carsReducer,
  language: languageReducer,
});

export default rootReducer;
