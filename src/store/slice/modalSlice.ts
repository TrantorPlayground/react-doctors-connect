import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    [key: string]: boolean;
}
const initialState: ModalState = {};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state = { ...state, [action.payload]: true };
      return state;
    },
    closeModal: (state, action) => {
      state = { ...state, [action.payload]: false };
      return state;
    },
    closeAll: (state, action) => {
      state = { ...initialState };
      return state;
    },
  },
});
export const { openModal, closeModal, closeAll } = modalSlice.actions;
export default modalSlice.reducer;
