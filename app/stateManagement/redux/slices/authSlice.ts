import AuthState from "@/app/types/reduxTypes/states/AuthState";
import User from "@/app/types/User";
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
    login: (state: AuthState, action: PayloadAction<User>) => {
      state.isAuthenticated = true,
      state.user = action.payload
    },
    logout: (state:AuthState) => {
      state.isAuthenticated = false,
      state.user = null
    }
   }
})
  
export const {login, logout} = authSlice.actions

export default authSlice.reducer;
  