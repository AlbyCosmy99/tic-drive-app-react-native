import {Languages} from '@/types/language/languages';
import LanguageState from '@/types/reduxTypes/states/LanguageState';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: LanguageState = {
  languageCode: 'it',
};

const languageSlice = createSlice({
  name: 'language',
  initialState: initialState,
  reducers: {
    setLanguageCode(state: LanguageState, action: PayloadAction<Languages>) {
      state.languageCode = action.payload;
    },
  },
});

export const {setLanguageCode} = languageSlice.actions;

export default languageSlice.reducer;
