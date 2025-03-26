import React, { useEffect } from 'react';
import { GetCartItemAction } from '../redux/actions/getCartItem.action';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import '../styles/cart.css';
import { MdDelete } from "react-icons/md";
import CartSummary from '../components/CartSummary';
import { FaAddressCard } from "react-icons/fa";

const Cart = () => {
    const { loading, items, error } = useSelector((state) => state.getCartItem);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCartItemAction());
    }, [dispatch]);

    if (loading) {
        return (<Loader />);
    }

    if (items.length === 0) {
        return (
            <div>
                <span>Your cart is empty</span>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const calculateTotalPrice = (items) => {
        let totalOfferPrice = 0;
        let totalActualPrice = 0;

        items.forEach((item) => {
            item.products.forEach((product) => {
                totalOfferPrice += product.quantity * product.productId.offerPrice;
                totalActualPrice += product.quantity * product.productId.actualPrice;
            });
        });

        return { totalOfferPrice, totalActualPrice };
    };

    const { totalOfferPrice, totalActualPrice } = calculateTotalPrice(items);

    return (
        <div>
            <div className="cart-section">
                <div className="cart-container">
                    {items.map((item) => (
                        <div key={item._id} className="cart">
                            <div className="cart-items-section">
                                <div className="cart-address-section">
                                    <p><FaAddressCard /> Add your address</p>
                                </div>
                                <div className="cart-items">
                                    <div className="cart-item">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>Product Name</td>
                                                    <td>Quantity</td>
                                                    <td>Product Price</td>
                                                    <td>Total Price</td>
                                                    <td>Delete</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.products.map((product) => (
                                                    <tr key={product._id}>
                                                        <td>
                                                            <div className="image-section">
                                                                <img
                                                                    src={`${process.env.REACT_APP_BACKEND_URL}/${product.productId.images[0]}`}
                                                                    alt={product.productId.name}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {product.productId.name}
                                                        </td>
                                                        <td>
                                                            {product.quantity}
                                                        </td>
                                                        <td>
                                                            {product.productId.offerPrice}
                                                        </td>
                                                        <td>
                                                            {product.quantity * product.productId.offerPrice}
                                                        </td>
                                                        <td className='delete'>
                                                            <button><span><MdDelete />Delete</span></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-info-section">
                                <CartSummary
                                    totalOfferPrice={totalOfferPrice}
                                    totalActualPrice={totalActualPrice}
                                    cartItems={items}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
