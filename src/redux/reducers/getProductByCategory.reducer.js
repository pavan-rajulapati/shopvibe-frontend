import { createSlice } from '@reduxjs/toolkit';
import { GetProductByCategoryAction } from '../actions/getProductByCategory.action';

const GetProductByCategoryReducer = createSlice({
  name: 'getProductByCategory',
  initialState: {
    loading: false,
    items: [],
    error: null,
    status: 'idle', 
  },
  reducers: {
    resetCategoryState: (state) => {
      state.items = [];
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProductByCategoryAction.pending, (state) => {
        state.loading = true;
        state.status = 'pending';
        state.error = null;
      })
      .addCase(GetProductByCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'fulfilled';
        state.items = action.payload.data || []; 
      })
      .addCase(GetProductByCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.status = 'rejected';
        state.error = action.payload;
        state.items = []; 
      });
  },
});

export const { resetCategoryState } = GetProductByCategoryReducer.actions;
export default GetProductByCategoryReducer.reducer;
