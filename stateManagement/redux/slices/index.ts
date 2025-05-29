import {combineReducers} from 'redux';
import authReducer from './authSlice';
import workshopsReducer from './workshopsSlice';
import carsReducer from './carsSlice';
import languageReducer from './languageSlice';
import bookingSlice from './bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  workshops: workshopsReducer,
  cars: carsReducer,
  language: languageReducer,
  booking: bookingSlice,
});

export default rootReducer;
