import { createSlice } from '@reduxjs/toolkit';
import { AddSellerDetails } from '../actions/sellerRegistration.action';

const AddSellerReducer = createSlice({
  name: 'addSeller',
  initialState: {
    loading: false,
    addSeller: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
		.addCase(AddSellerDetails.pending, (state) => {
			state.loading = true;
		})
		.addCase(AddSellerDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.addSeller.push(action.payload);
		})
		.addCase(AddSellerDetails.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
  },
});

export default AddSellerReducer.reducer;
