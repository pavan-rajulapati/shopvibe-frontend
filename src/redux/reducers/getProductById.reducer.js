import { createSlice } from "@reduxjs/toolkit";
import { GetProductByIdAction } from "../actions/getProductById.action";

const GetProductByIdReducer = createSlice({
    name: 'getProductById',
    initialState: {
        loading: false,
        items: [], 
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProductByIdAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProductByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data; 
            })
            .addCase(GetProductByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            });
    }
});

export default GetProductByIdReducer.reducer;
