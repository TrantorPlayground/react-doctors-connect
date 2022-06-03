import { createSlice } from '@reduxjs/toolkit';
import { iProfile } from '../../interfaces/global';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
    doctors: [],
  },
  reducers: {
    onSearch: (state, action) => {
      // TODO
    },
    onSearchSuccess: (state, action) => {
      // TODO
    },
    onSearchError: (state, action) => {
      // TODO
    },
    resetSearch: (state, action) => {
      // TODO
    },
  },
});
export const {
  onSearch,
  onSearchSuccess,
  onSearchError,
  resetSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
