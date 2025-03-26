import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const GetCartItemAction = createAsyncThunk('/getCartItem', async (category, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-cart`,{
            withCredentials : true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch cart item'
        );
    }
});