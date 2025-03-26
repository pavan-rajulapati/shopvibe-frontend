import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ReviewAction = createAsyncThunk(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/review?productId=${productId}`,{withCredentials : true});
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
