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
      action: PayloadAction<number>,
    ) {
      state.servicesChoosenByUsers = [action.payload];
    },
    setServicesChoosenByWorkshops(
      state: ServicesState,
      action: PayloadAction<number>,
    ) {
      state.servicesChoosenByWorkshops = [action.payload];
    },
    addServiceChoosenByUsers(
      state: ServicesState,
      action: PayloadAction<number>,
    ) {
      if (!state.servicesChoosenByUsers.includes(action.payload)) {
        state.servicesChoosenByUsers.push(action.payload);
      }
    },
    addServiceChoosenByWorkshops(
      state: ServicesState,
      action: PayloadAction<number>,
    ) {
      if (!state.servicesChoosenByWorkshops.includes(action.payload)) {
        state.servicesChoosenByWorkshops.push(action.payload);
      }
    },
    removeServiceChoosenByUsers(
      state: ServicesState,
      action: PayloadAction<number>,
    ) {
      const index = state.servicesChoosenByUsers.indexOf(action.payload);
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
      const index = state.servicesChoosenByWorkshops.indexOf(action.payload);
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
