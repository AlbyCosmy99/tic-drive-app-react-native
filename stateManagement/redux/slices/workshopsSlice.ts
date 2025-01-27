import WorkshopsState from '@/types/reduxTypes/states/WorkshopsState';
import {createSlice} from '@reduxjs/toolkit';

const initialState: WorkshopsState = {};

const workshopSlice = createSlice({
  name: 'workshops',
  initialState: initialState,
  reducers: {},
});

export const {} = workshopSlice.actions;

export default workshopSlice.reducer;
