import { createSlice } from '@reduxjs/toolkit';
import { addUserAddress } from '../actions/userAddress.action';

const userAddressSlice = createSlice({
  name: 'userAddress',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        console.log('API Response:', action.payload);
        state.items.push(action.payload);
      })      
      .addCase(addUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userAddressSlice.reducer;
