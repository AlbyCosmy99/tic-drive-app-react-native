import Car from '@/types/Car';
import Service from '@/types/Service';
import Workshop from '@/types/workshops/Workshop';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BookingState {
  service: Service | undefined;
  lastServiceSelectedFromFilter: Service | undefined;
  workshop: Workshop | undefined;
  lastWorkshopSelectedFromFilter: Workshop | undefined;
  car: Car | undefined;
  time: string;
}

const initialState: BookingState = {
  service: undefined,
  lastServiceSelectedFromFilter: undefined,
  workshop: undefined,
  lastWorkshopSelectedFromFilter: undefined,
  car: undefined,
  time: '',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setService(
      state: BookingState,
      action: PayloadAction<Service | undefined>,
    ) {
      state.service = action.payload;
    },
    setLastServiceSelectedFromFilter(
      state: BookingState,
      action: PayloadAction<Service | undefined>,
    ) {
      state.lastServiceSelectedFromFilter = action.payload;
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
  },
});

export const {
  setService,
  setWorkshop,
  setCar,
  setTime,
  setLastServiceSelectedFromFilter,
} = bookingSlice.actions;

export default bookingSlice.reducer;
