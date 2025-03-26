import { createSlice } from '@reduxjs/toolkit';
import { GetProductAction } from '../actions/getProduct.action';

const GetProductReducer = createSlice({
    name: 'searchProduct',
    initialState: {
        loading: false,
        items: [],
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProductAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetProductAction.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(GetProductAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default GetProductReducer.reducer;
