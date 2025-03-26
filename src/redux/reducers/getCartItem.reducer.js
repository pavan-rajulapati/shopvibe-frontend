import { createSlice } from '@reduxjs/toolkit';
import { GetCartItemAction } from '../actions/getCartItem.action';

const GetCartItemReducer = createSlice({
  name: 'getCartItem',
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
      .addCase(GetCartItemAction.pending, (state) => {
        state.loading = true;
        state.status = 'pending';
        state.error = null;
      })
      .addCase(GetCartItemAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'fulfilled';
        state.items = action.payload.userData; 
      })
      .addCase(GetCartItemAction.rejected, (state, action) => {
        state.loading = false;
        state.status = 'rejected';
        state.error = action.payload;
        state.items = []; 
      });
  },
});

export const { resetCategoryState } = GetCartItemReducer.actions;
export default GetCartItemReducer.reducer;
