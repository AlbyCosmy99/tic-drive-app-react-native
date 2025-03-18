import WorkshopsState from '@/types/reduxTypes/states/WorkshopsState';
import Workshop from '@/types/workshops/Workshop';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: WorkshopsState = {
  selectedWorkshop: null,
  lastWorkshopSelectedFromFilter: undefined,
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
    setLastWorkshopSelectedFromFilter(
      state: WorkshopsState,
      action: PayloadAction<Workshop | undefined>,
    ) {
      state.lastWorkshopSelectedFromFilter = action.payload;
    },
  },
});

export const {setSelectedWorkshop, setLastWorkshopSelectedFromFilter} =
  workshopSlice.actions;

export default workshopSlice.reducer;
