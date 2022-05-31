import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {},
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
