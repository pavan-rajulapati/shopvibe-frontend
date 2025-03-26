import { AddReviewAction } from "../actions/addReview.action";
import { createSlice } from '@reduxjs/toolkit'

const AddReviewReducer = createSlice({
    name : 'AddReview',
    initialState : {
        loading : false,
        data : [],
        error : null,
        status : 'idle'
    },
    reducers : {
        resetState : (state) => {
            state.data = []
            state.error = null
            state.status = 'idle'
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(AddReviewAction.pending, (state) => {
            state.loading = true
            state.status = 'loading'
        })
        .addCase(AddReviewAction.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.status = 'success'
        })
        .addCase(AddReviewAction.rejected, (state, action) => {
            state.loading = false
            state.status = 'rejected'
            state.error = action.payload
        })

    }
})

export const {resetState} = AddReviewReducer.actions
export default AddReviewReducer.reducer