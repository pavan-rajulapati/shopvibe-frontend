import { addProduct } from "../actions/product.action";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'addProduct',
    initialState:{
        items : [],
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder)=> {
        builder
        .addCase(addProduct.pending, (state)=>{
            state.loading = true
        })
        .addCase(addProduct.fulfilled, (state, action)=>{
            state.loading = false;
            console.log(action.payload)
            state.items.push(action.payload)
        })
        .addCase(addProduct.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload
        }) 
    }
})

export default productSlice.reducer;