import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GetProductAction = createAsyncThunk(
    '/get/product',
    async ({ query = '', page = 1, limit = 20 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/product/search`,
                { params: { query, page, limit }, withCredentials: true }   
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            );
        }
    }
);
