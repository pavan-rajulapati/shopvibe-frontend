import React from 'react';
import '../styles/cartSummary.css';
import { IoBagCheckOutline } from "react-icons/io5";
import { BsCurrencyRupee } from "react-icons/bs";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'; // Importing axios

const CartSummary = ({ totalOfferPrice, totalActualPrice, cartItems }) => {

    const cartItemCount = cartItems?.[0]?.products?.length || 0;

    const handleCheckout = async () => {
		const stripe = await loadStripe("pk_test_51PXcaaDSw6Wgtq8t3bwrPvdVmL5kwO28pZufOIGzTx6ptWN1vDLBHssgSMmCaUFcKtSVv0w7VhCjS9aIXsHWFjvj00kQzUijRH");
	
		const body = {
			products: cartItems?.map(item => (
				item?.products?.map((product) => ({
					name: product?.productId?.name,
					images: product?.productId?.images?.[0] ? [product.productId.images[0]] : [],
					offerPrice: product?.productId?.offerPrice,
					quantity: product?.quantity || 1,
				}))
			)).flat(),  // Flattening the nested arrays
		};
	
		console.log("Sending products to backend:", { products: body });
	
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/checkout/session`,
				body,
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
	
			if (response.status !== 200) {
				throw new Error(`Error: ${response.statusText}`);
			}
	
			const session = response.data;
			console.log('Received session:', session);
	
			const result = await stripe.redirectToCheckout({
				sessionId: session.id,
			});
	
			if (result.error) {
				console.log(result.error);
			}
		} catch (error) {
			console.log('Error during checkout:', error);
		}
	};
	
	

    return (
        <div>
            <div className="cart-summery-section">
                <div className="cart-summery-container">
                    <form>
                        <div className="head">
                            <span>Cart summary</span>
                        </div>
                        <div className="info">
                            <div>
                                <p>Price ({cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'})</p>
                                <span><BsCurrencyRupee />{totalActualPrice}</span>
                            </div>
                            <div>
                                <p>Discount</p>
                                <span><BsCurrencyRupee />{totalActualPrice - totalOfferPrice}</span>
                            </div>
                            <div>
                                <p>Platform Fee</p>
                                <span><BsCurrencyRupee />{totalOfferPrice > 1000 ? '15' : '5'}</span>
                            </div>
                            <div>
                                <p>Delivery Charges</p>
                                <span>Free</span>
                            </div>
                            <div className="total-amount">
                                <p>Total Amount</p>
                                <span><BsCurrencyRupee />{totalOfferPrice}</span>
                            </div>
                        </div>
                        <div className="btn">
                            <button type="button" onClick={handleCheckout}>
                                <span><IoBagCheckOutline /></span>
                                Checkout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
