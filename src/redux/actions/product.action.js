import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk('product/addProduct', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product-form`, data, {
            withCredentials: true,
        });
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
