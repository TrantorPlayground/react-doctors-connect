import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers:{
        onSearch:(state, action) => {},
        onSearchSuccess:(state, action) => {},
        onSearchError:(state, action) => {},
        resetSearch:(state, action) => {},
    }
})
export const {
    onSearch,
    onSearchSuccess,
    onSearchError,
    resetSearch,
} = searchSlice.actions;
export default searchSlice.reducer;