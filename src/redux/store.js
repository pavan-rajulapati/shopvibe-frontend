import { configureStore } from '@reduxjs/toolkit';
import userAddressReducer from './reducers/userAddress.reducer';
import productReducer from './reducers/product.reducer'
import userDetailsReducer from './reducers/userDetails.reducer'
import AddSellerReducer from './reducers/sellerRegistration.reducer'
import GetProductReducer from './reducers/getProduct.reducer'
import GetProductByIdReducer from './reducers/getProductById.reducer';
import UserDataReducer from './reducers/userData.reducer';
import ReviewReducer from './reducers/review.reducer';
import GetProductByCategoryReducer from './reducers/getProductByCategory.reducer';
import AddReviewReducer from './reducers/addReview.reducer'
import AddCartItemReducer from './reducers/addCartItem.reducer'
import GetCartItemReducer from './reducers/getCartItem.reducer'



const store = configureStore({
	reducer: {
		userAddress: userAddressReducer,
		product : productReducer,
		userDetails : userDetailsReducer,
		addSeller : AddSellerReducer,
		searchProduct : GetProductReducer,
		getProductById : GetProductByIdReducer,
		userData : UserDataReducer,
		review : ReviewReducer,
		category : GetProductByCategoryReducer,
		addReview : AddReviewReducer,
		addCartItem : AddCartItemReducer,
		getCartItem : GetCartItemReducer
	},
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
