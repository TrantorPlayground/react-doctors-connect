import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {iProfile} from "../../interfaces/global";
const initialState:iProfile = {
    email: "",
    name: "",
    phone: "",
    role: "",
}
const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        onProfileCreate: (state, action) => {
        },
        onProfileCreateSuccess: (state, action) => {
        },
        onProfileCreateError: (state, action) => {
        },
        onProfileUpdate: (state, action) => {
        },
        onProfileUpdateSuccess: (state, action) => {
        },
        onProfileUpdateError: (state, action) => {
        },
        onProfileDelete: (state, action) => {
        },
        onProfileDeleteSuccess: (state, action) => {
        },
        onProfileDeleteError: (state, action) => {
        },
        onProfileGet: (state, action) => {
            state = action.payload;
            return state;
        },
        onProfileGetSuccess: (state, action) => {
        },
        onProfileGetError: (state, action) => {
        },
    }
})
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
} = ProfileSlice.actions;
export default ProfileSlice.reducer;