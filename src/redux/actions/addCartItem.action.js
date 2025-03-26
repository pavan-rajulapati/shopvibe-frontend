import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const AddCartItemAction = createAsyncThunk('/addCartItem', async (cartData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart`, cartData, {
            withCredentials : true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to post the cart item'
        )
    }
})