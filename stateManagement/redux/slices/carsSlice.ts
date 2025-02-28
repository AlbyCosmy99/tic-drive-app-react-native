import Car from '@/types/Car';
import CarState from '@/types/reduxTypes/states/CarState';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: CarState = {
  selectedCar: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: initialState,
  reducers: {
    setSelectedCar(state: CarState, action: PayloadAction<Car | undefined>) {
      state.selectedCar = action.payload;
    },
  },
});

export const {setSelectedCar} = carsSlice.actions;

export default carsSlice.reducer;
