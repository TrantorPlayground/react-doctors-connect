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
      state[action.payload] = true;
    },
    closeModal: (state, action) => {
      state[action.payload] = false;
    },
    closeAll: (state, action) => {
      state = { ...initialState };
      return state;
    },
  },
});
export const { openModal, closeModal, closeAll } = modalSlice.actions;
export default modalSlice.reducer;
