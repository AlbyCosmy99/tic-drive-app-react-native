import Car from '@/types/Car';
import Service from '@/types/Service';
import Workshop from '@/types/workshops/Workshop';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BookingState {
  services: Service[];
  lastServiceSelectedFromFilter: Service | undefined;
  serviceTreeLevel: number;
  workshop: Workshop | undefined;
  lastWorkshopSelectedFromFilter: Workshop | undefined;
  car: Car | undefined;
  time: string;
  pinCode: string;
}

const initialState: BookingState = {
  services: [],
  lastServiceSelectedFromFilter: undefined,
  serviceTreeLevel: 1,
  workshop: undefined,
  lastWorkshopSelectedFromFilter: undefined,
  car: undefined,
  time: '',
  pinCode: '',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setLastServiceSelectedFromFilter(
      state: BookingState,
      action: PayloadAction<Service | undefined>,
    ) {
      state.lastServiceSelectedFromFilter = action.payload;
    },
    setServices(state: BookingState, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },
    addService(
      state: BookingState,
      action: PayloadAction<{service: Service; index?: number}>,
    ) {
      if (typeof action.payload.index === 'number') {
        state.services[action.payload.index] = action.payload.service;
      } else {
        state.services.push(action.payload.service);
      }
    },
    setServiceTreeLevel(state: BookingState, action: PayloadAction<number>) {
      state.serviceTreeLevel = action.payload;
    },
    removeService(state: BookingState) {
      state.services.pop();
    },
    setWorkshop(
      state: BookingState,
      action: PayloadAction<Workshop | undefined>,
    ) {
      state.workshop = action.payload;
    },
    setLastWorkshopSelectedFromFilter(
      state: BookingState,
      action: PayloadAction<Workshop | undefined>,
    ) {
      state.lastWorkshopSelectedFromFilter = action.payload;
    },
    setCar(state: BookingState, action: PayloadAction<Car | undefined>) {
      state.car = action.payload;
    },
    setTime(state: BookingState, action: PayloadAction<string>) {
      state.time = action.payload;
    },
    setPinCode(state: BookingState, action: PayloadAction<string>) {
      state.pinCode = action.payload;
    },
    reset(state: BookingState) {
      state.services = [];
      state.workshop = undefined;
      state.car = undefined;
      state.time = '';
      state.pinCode = '';
      state.serviceTreeLevel = 1;
    },
  },
});

export const {
  setWorkshop,
  setCar,
  setTime,
  setLastServiceSelectedFromFilter,
  addService,
  setServiceTreeLevel,
  removeService,
  setServices,
  setPinCode,
  reset,
} = bookingSlice.actions;

export default bookingSlice.reducer;
