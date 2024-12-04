import ServicesState from '@/types/reduxTypes/states/ServicesState';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ServicesState = {
  servicesChoosenByUsers: [],
  servicesChoosenByWorkshops: [],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    setServicesChoosenByUsers(
      state: ServicesState,
      action: PayloadAction<Service>,
    ) {
      state.servicesChoosenByUsers = [action.payload];
    },
    setServicesChoosenByWorkshops(
      state: ServicesState,
      action: PayloadAction<Service>,
    ) {
      state.servicesChoosenByWorkshops = [action.payload];
    },
    addServiceChoosenByUsers(
      state: ServicesState,
      action: PayloadAction<Service>,
    ) {
      if (!state.servicesChoosenByUsers.find(service => service.id === action.payload.id)) {
        state.servicesChoosenByUsers.push(action.payload);
      }
    },
    addServiceChoosenByWorkshops(
      state: ServicesState,
      action: PayloadAction<Service>,
    ) {
      if (!state.servicesChoosenByWorkshops.find(service => service.id === action.payload.id)) {
        state.servicesChoosenByWorkshops.push(action.payload);
      }
    },
    removeServiceChoosenByUsers(
      state: ServicesState,
      action: PayloadAction<number>,
    ) {
      let index = -1;
      for(let i = 0; i < state.servicesChoosenByUsers.length; i++) {
        if(state.servicesChoosenByUsers[i].id === action.payload) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        state.servicesChoosenByUsers = [
          ...state.servicesChoosenByUsers.slice(0, index),
          ...state.servicesChoosenByUsers.slice(index + 1),
        ];
      }
    },
    removeServiceChoosenByWorkshops(
      state: ServicesState,
      action: PayloadAction<number>,
    ) {
      let index = -1;
      for(let i = 0; i < state.servicesChoosenByUsers.length; i++) {
        if(state.servicesChoosenByUsers[i].id === action.payload) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        state.servicesChoosenByWorkshops = [
          ...state.servicesChoosenByWorkshops.slice(0, index),
          ...state.servicesChoosenByWorkshops.slice(index + 1),
        ];
      }
    },
    reset(state: ServicesState) {
      state.servicesChoosenByUsers = [];
      state.servicesChoosenByWorkshops = [];
    },
  },
});

export const {
  setServicesChoosenByUsers,
  setServicesChoosenByWorkshops,
  addServiceChoosenByUsers,
  addServiceChoosenByWorkshops,
  removeServiceChoosenByUsers,
  removeServiceChoosenByWorkshops,
  reset,
} = servicesSlice.actions;

export default servicesSlice.reducer;
