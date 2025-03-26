import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const GetProductByIdAction = createAsyncThunk('/getProductById', async (productId, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch products'
        );
    }
});