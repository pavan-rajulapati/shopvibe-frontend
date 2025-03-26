import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addUserAddress = createAsyncThunk('user/addAddress', async (data) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user-address`, data,
    {
      withCredentials : true
    }
  );
  return response.data;
});
