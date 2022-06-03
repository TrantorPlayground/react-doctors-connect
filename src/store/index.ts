import { configureStore } from '@reduxjs/toolkit';
import profile from './slice/profileSlice';
import search from './slice/searchSlice';
import messages from './slice/messageSlice';
import user from './slice/userSlice';
import modal from './slice/modalSlice';
import appointment from './slice/appointmentSlice';

export const store = configureStore({
  reducer: {
    profile,
    search,
    messages,
    user,
    modal,
    appointment,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
