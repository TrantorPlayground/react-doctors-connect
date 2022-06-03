import { createSlice } from '@reduxjs/toolkit';
import { iProfile } from '../../interfaces/global';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    doctor: {},
  } as {doctor: iProfile},
  reducers: {
    setDoctor: (state, action) => {
      state.doctor = action.payload;
    },
  },
});
export const { setDoctor } = appointmentSlice.actions;
export default appointmentSlice.reducer;
