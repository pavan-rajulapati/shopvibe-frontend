import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUserDetails = createAsyncThunk('user/userDetails',async (data)=>{
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user-details`,data,{
        withCredentials : true
    })

    return response
})