import { createSlice } from '@reduxjs/toolkit'
import { UserDataAction } from '../actions/userData.action'

const UserDataReducer = createSlice({
    name : 'UserData',
    initialState : {
        loading : false,
        data : [],
        error : null
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder 
        .addCase(UserDataAction.pending, (state) => {
            state.loading = true
        })
        .addCase(UserDataAction.fulfilled, (state, action) =>{
            state.loading = false
            state.data = action.payload
        })
        .addCase(UserDataAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default UserDataReducer.reducer