import WorkshopsState from '@/types/reduxTypes/states/WorkshopsState';
import  { WorkshopMini } from '@/types/workshops/Workshop';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: WorkshopsState = {
  selectedWorkshop: null
};

const workshopSlice = createSlice({
  name: 'workshops',
  initialState: initialState,
  reducers: {
    setSelectedWorkshop(
      state: WorkshopsState,
      action: PayloadAction<WorkshopMini | null>,
    ) {
      state.selectedWorkshop = action.payload;
    },
  },
});

export const {setSelectedWorkshop} = workshopSlice.actions;

export default workshopSlice.reducer;
