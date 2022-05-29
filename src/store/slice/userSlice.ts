import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers:{
        onLogin:(state, action) => {

        },
        onLoginSuccess:(state, action) => {},
        onLoginError:(state, action) => {},
        onLogout:(state, action) => {},
        onLogoutSuccess:(state, action) => {},
        onRegister:(state, action) => {},
        onRegisterSuccess:(state, action) => {},
        onRegisterError:(state, action) => {},
    }
})
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