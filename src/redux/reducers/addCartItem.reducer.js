import { AddCartItemAction } from '../actions/addCartItem.action'
import { createSlice } from '@reduxjs/toolkit'

const AddCartItemReducer = createSlice({
    name : 'AddCartItem',
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
        .addCase(AddCartItemAction.pending, (state) => {
            state.loading = true
            state.status = 'loading'
        })
        .addCase(AddCartItemAction.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.status = 'success'
        })
        .addCase(AddCartItemAction.rejected, (state, action) => {
            state.loading = false
            state.status = 'rejected'
            state.error = action.payload
        })

    }
})

export const {resetState} = AddCartItemReducer.actions
export default AddCartItemReducer.reducer