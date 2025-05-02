import AuthState from '@/types/reduxTypes/states/AuthState';
import User from '@/types/User';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LatLng} from 'react-native-maps';

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state: AuthState) => {
      (state.token = null), (state.user = null);
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAddress(state: AuthState, action: PayloadAction<string>) {
      state.user = {...state.user, address: action.payload};
    },
    setCoordinates(state: AuthState, action: PayloadAction<LatLng>) {
      state.user = {...state.user, coordinates: action.payload};
    },
  },
});

export const {login, logout, setToken, setAddress, setCoordinates} =
  authSlice.actions;

export default authSlice.reducer;
