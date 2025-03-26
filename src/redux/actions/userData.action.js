import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const UserDataAction = createAsyncThunk('/userData', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-user`,{
            withCredentials : true
        })
        return response.data.userData
        console.log('this is data',response.data.userData)
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Error at fetching userData'
        )
    }

} )
