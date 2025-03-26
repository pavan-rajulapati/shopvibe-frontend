import { createSlice } from "@reduxjs/toolkit";
import { ReviewAction } from "../actions/review.action";

const reviewSlice = createSlice({
	name: "review",
	initialState: {
		data: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(ReviewAction.pending, (state) => {
			state.loading = true;
		})
		.addCase(ReviewAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload; 
		})
		.addCase(ReviewAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default reviewSlice.reducer;
