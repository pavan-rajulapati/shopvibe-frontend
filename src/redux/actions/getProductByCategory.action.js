import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const GetProductByCategoryAction = createAsyncThunk('/getProductByCategory', async (category, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-category/${category}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch products'
        );
    }
});