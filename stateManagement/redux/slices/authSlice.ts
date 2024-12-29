import AuthState from '@/types/reduxTypes/states/AuthState';
import User from '@/types/User';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<User>) => {
      (state.user = action.payload);
    },
    logout: (state: AuthState) => {
      (state.token = null), (state.user = null);
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  },
});

export const {login, logout, setToken} = authSlice.actions;

export default authSlice.reducer;
