import React, { useEffect, useState } from 'react';
import '../styles/subProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProductByIdAction } from '../redux/actions/getProductById.action';
import Loader from './Loader';
import { toast, Toaster } from 'react-hot-toast';
import { MdFavoriteBorder } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import ProductAbout from './ProductAbout';
import Review from './Review';
import { ReviewAction } from '../redux/actions/review.action';
import { AddCartItemAction } from '../redux/actions/addCartItem.action';
import { IoBagAdd } from "react-icons/io5";
import StarRating from '../middleware/StarRating';

const Product = () => {
    const [mainImage, setMainImage] = useState('');
    const { loading, items } = useSelector((state) => state.getProductById);
    const { data } = useSelector((state) => state.review);
    const reviews = data?.data || [];
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [cartData, setCartData] = useState({
        productId: '',
        quantity: 0,
        sizes: [],
        colors: []
    });
    const navigate = useNavigate()

    const { loading: cartItemLoading, data: cartDataState, error: cartItemError, status: cartItemStatus } = useSelector((state) => state.addCartItem);

    useEffect(() => {
        try {
            dispatch(GetProductByIdAction(id));
        } catch (error) {
            toast.error(error?.message || "Failed to fetch product");
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
            dispatch(ReviewAction(id));
        }
    }, [dispatch, id]);

    if (loading) return <Loader />;
    if (!items) return <div>No product found</div>;

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity !== 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const calculateOverallRating = (reviews) => {
        if (!Array.isArray(reviews) || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        return Math.round((totalRating / reviews.length).toFixed(1));
    };
    

    const handleColorSelection = (color) => {
        setCartData((prevData) => ({
            ...prevData,
            colors: [color]  
        }));
    };

    const handleSizeSelection = (size) => {
        setCartData((prevData) => ({
            ...prevData,
            sizes : [size]
        }));
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10); 
        setCartData((prevData) => ({
            ...prevData,
            quantity: newQuantity,
        }));
    };

    if(cartItemLoading) return (<Loader></Loader>);
    if(cartItemError) return (toast.error(cartItemError));

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedCartData = {
            ...cartData,
            productId: items._id,  
            quantity: quantity,    
        };
        dispatch(AddCartItemAction(updatedCartData));
        navigate('/cart')

        setCartData({
            productId: '',
            quantity: 1,
            sizes: [],
            colors: [],
        });

        setCartData.quantity = 1;
    };

    return (
        <div className="Product-container">
            <div className="container">
                <div className="products">
                    <div className="product">
                        <div className="image-section">
                            <div className="image-preview">
                                {items.images && items.images.length > 0 ? (
                                    items.images.map((image, index) => (
                                        <div className="image-preview-item" key={index}>
                                            <img
                                                src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                                                alt={`Preview ${index + 1}`}
                                                className="preview-image"
                                                onClick={() => setMainImage(image)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                            <div className="main-image">
                                <img
                                    src={mainImage
                                        ? `${process.env.REACT_APP_BACKEND_URL}/${mainImage}`
                                        : items.images?.[0]
                                            ? `${process.env.REACT_APP_BACKEND_URL}/${items.images[0]}`
                                            : "default-image-url.jpg"
                                    }
                                    alt="Main Product"
                                />
                            </div>
                        </div>

                        <div className="information">
                            <div className='top-section'>
                                <h1>{items.name}</h1>
                                <span><MdFavoriteBorder /></span>
                            </div>

                            <div className='rating'>
                                {Array.isArray(reviews) && reviews.length > 0 ? (
                                    <div className='rating'>
                                        <StarRating rating={calculateOverallRating(reviews)}></StarRating>
                                        <span className='total-reviews'>{reviews.length} customers reviewed this product</span>
                                    </div>
                                    
                                ) : (
                                    <p>No ratings available</p>
                                )}
                            </div>

                            <div className='brand'>
                                <p>Brand: {items.brand}</p>
                            </div>

                            <div className='description'>
                                <p>{items.description}</p>
                            </div>

                            <div className='price'>
                                <p><del>₹{items.actualPrice}</del> ₹{items.offerPrice}</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="color-size">
                                    {Array.isArray(items.colors) && items.colors.some(color => color && color.trim() !== '') && (
                                        <div className="colors">
                                            <span>Colors</span>
                                            <div className="color-items-container">
                                                {items.colors.map((color, index) => (
                                                <div key={index} className="color-item">
                                                    <div
                                                        className={cartData.colors.includes(color) ? 'selected-color' : 'color'}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => handleColorSelection(color)}
                                                    ></div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {Array.isArray(items.colors) && items.sizes.some(size => size && size.trim() !== '') && (
                                        <div className="sizes">
                                            <span>Sizes</span>
                                            <div className="size-items-container">
                                                {items.sizes.map((size, index) => (
                                                <div key={index} className={cartData.sizes.includes(size) ? 'selected-size' : 'size'}>
                                                    <div onClick={() => handleSizeSelection(size)}>{size}</div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>


                                {items.warranty > 0 && (
                                    <div className='warranty'>
                                        <p>Warranty: <span>{items.warranty} Years</span></p>
                                    </div>
                                )}

                                <div className='add-to-cart'>
                                    <div className='cart-section'>
                                        <div className='inc-dec'>
                                            <select name="" id="">
                                                <option value="">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                            </select>
                                        </div>
                                        <div className='add-to-cart-button'>
                                            <button type='submit'><IoBagAdd />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ProductAbout productId={items._id} />
                <Review productId={items._id} />
            </div>
            <Toaster />
        </div>
    );
};

export default Product;
