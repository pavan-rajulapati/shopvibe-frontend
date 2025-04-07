import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ReviewAction = createAsyncThunk(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${productId}`,{withCredentials : true});
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
