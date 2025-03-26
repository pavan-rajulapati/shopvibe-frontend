import { createSlice } from '@reduxjs/toolkit';
import { addUserDetails } from '../actions/userDetails.action';

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    loading: false,
    error: null,
    userDetails: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(addUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetailsSlice.reducer;
