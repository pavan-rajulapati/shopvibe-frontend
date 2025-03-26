import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const AddSellerDetails = createAsyncThunk('seller/registration', async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/seller-register`,data,
        {
          withCredentials: true,
        });
		
      return response.data;
    } catch (error) {
        console.log(error.response.data)
		return rejectWithValue(error.response?.data);
    }
  });
  