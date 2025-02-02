import WorkshopsState from '@/types/reduxTypes/states/WorkshopsState';
import Workshop from '@/types/workshops/Workshop';
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
      action: PayloadAction<Workshop | null>,
    ) {
      state.selectedWorkshop = action.payload;
    },
  },
});

export const {setSelectedWorkshop} = workshopSlice.actions;

export default workshopSlice.reducer;
