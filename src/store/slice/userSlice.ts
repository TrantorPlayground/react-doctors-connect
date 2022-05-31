import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    onLogin: (state, action) => {
      // TODO
    },
    onLoginSuccess: (state, action) => {
      // TODO
    },
    onLoginError: (state, action) => {
      // TODO
    },
    onLogout: (state, action) => {
      // TODO
    },
    onLogoutSuccess: (state, action) => {
      // TODO
    },
    onRegister: (state, action) => {
      // TODO
    },
    onRegisterSuccess: (state, action) => {
      // TODO
    },
    onRegisterError: (state, action) => {
      // TODO
    },
  },
});
export const {
  onLogin,
  onLoginSuccess,
  onLoginError,
  onLogout,
  onLogoutSuccess,
  onRegister,
  onRegisterSuccess,
  onRegisterError,
} = userSlice.actions;
export default userSlice.reducer;
