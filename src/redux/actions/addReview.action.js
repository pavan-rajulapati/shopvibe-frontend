import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const AddReviewAction = createAsyncThunk('/addReview', async (reviewData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/review`, reviewData, {
            withCredentials : true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to post the review'
        )
    }
})