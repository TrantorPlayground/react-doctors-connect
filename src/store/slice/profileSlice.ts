import { createSlice } from '@reduxjs/toolkit';
import { iProfile } from '../../interfaces/global';

const initialState: iProfile = {
  email: '',
  name: '',
  phone: '',
  role: '',
  id: '',
  bio: '',
  consultationCharges: 0,
  specialities: [],
};
const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    onProfileCreate: (state, action) => {
      // todo
    },
    onProfileCreateSuccess: (state, action) => {
      // todo
    },
    onProfileCreateError: (state, action) => {
      // todo
    },
    onProfileUpdate: (state, action) => {
      // todo
    },
    onProfileUpdateSuccess: (state, action) => {
      // todo
    },
    onProfileUpdateError: (state, action) => {
      // todo
    },
    onProfileDelete: (state, action) => {
      // todo
    },
    onProfileDeleteSuccess: (state, action) => {
      // todo
    },
    onProfileDeleteError: (state, action) => {
      // todo
    },
    onProfileGet: (state, action) => {
      // todo
      state = action.payload;
      return state;
    },
    onProfileGetSuccess: (state, action) => {
      // todo
    },
    onProfileGetError: (state, action) => {
      // todo
    },
    onLogout: (state, action) => {
      state = initialState;
      return state;
    },
  },
});
export const {
  onProfileCreate,
  onProfileCreateSuccess,
  onProfileCreateError,
  onProfileUpdate,
  onProfileUpdateSuccess,
  onProfileUpdateError,
  onProfileDelete,
  onProfileDeleteSuccess,
  onProfileDeleteError,
  onProfileGet,
  onProfileGetSuccess,
  onProfileGetError,
  onLogout,
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
