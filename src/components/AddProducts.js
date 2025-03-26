import React, { useState, useEffect} from 'react';
import '../styles/addProduct.css';
import { IoMdInformationCircle } from "react-icons/io";  
import { Toaster, toast } from 'react-hot-toast';
import { addProduct } from '../redux/actions/product.action';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloudUploadSharp } from "react-icons/io5";
import Loader from './Loader';

const AddProducts = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.product);
    const [productData, setProductData] = useState({
        name: '',
        brand: '',
        description: '',
        actualPrice: '',
        offerPrice: '',
        category: '',
        stock: '',
        sizes: [],
        colors: [],
        warranty: '',
        images: [],
        imagePreviews: []
    });


    const handleInput = (e) => {
        const { name, type, files } = e.target;
    
        if (type === 'file') {
            const fileArray = Array.from(files);
            const newImagePreviews = fileArray.map(file => URL.createObjectURL(file)); 
            
            setProductData((prevData) => ({
                ...prevData,
                [name]: [...prevData[name], ...fileArray], 
                imagePreviews: [...prevData.imagePreviews, ...newImagePreviews] 
            }));
        } else {
            setProductData((prevData) => ({
                ...prevData,
                [name]: e.target.value
            }));
        }
    };
    
    
    const handleCategoryChange = (e) => {
        setProductData((prevData) => ({
            ...prevData, category: e.target.value, sizes: [] 
        }));
    };

    const handleSizeSelect = (size) => {
        setProductData((prevData) => {
            const isSelected = prevData.sizes.includes(size);
            return {
                ...prevData,
                sizes: isSelected ? prevData.sizes.filter(s => s !== size) : [...prevData.sizes, size]
            };
        });
    };

    const handleColorSelect = (color) => {
        setProductData((prevData) => {
            const isSelected = prevData.colors.includes(color);
            return {
                ...prevData,
                colors: isSelected ? prevData.colors.filter(c => c !== color) : [...prevData.colors, color]
            };
        });
    };

    const colors = ['red', 'green', 'yellow', 'black', 'pink', 'blue', 'orange', 'white', 'brown', 'skyblue'];
    const sizes = {
        fashion: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        footwear: [6, 7, 8, 9, 10, 11, 12, 13]
    };

    let availableSizes = [];
    if (productData.category === 'fashion') {
        availableSizes = sizes.fashion;
    } else if (productData.category === 'furniture') {
        availableSizes = sizes.footwear;  
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'brand', 'description', 'actualPrice', 'offerPrice', 'category', 'stock', 'warranty'];

        const isAnyRequiredFieldEmpty = Object.entries(productData).some(([key, value]) => {
            if (requiredFields.includes(key)) {
                return value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0);
            }
            return false; 
        });

        const actualPrice = parseFloat(productData.actualPrice)
        const offerPrice = parseFloat(productData.offerPrice)

        if(isAnyRequiredFieldEmpty){
            toast.error('Fields Required')
        }else if(productData.stock <= 0){
            toast.error('Stocks must be greter than 1')
        }else if(actualPrice < offerPrice){
            toast.error('Offer price must be less than actual price')
        }else if(actualPrice <= 0 || offerPrice <= 0){
            toast.error('Enter a valid prices')
        }else if(productData.images.length > 6){
            toast.error('you can add max 6 images')
        }
        else{
        

            const formData = new FormData();

            formData.append('name',productData.name)
            formData.append('brand',productData.brand)
            formData.append('description',productData.description)
            formData.append('actualPrice',productData.actualPrice)
            formData.append('offerPrice',productData.offerPrice)
            formData.append('category',productData.category)
            formData.append('stock',productData.stock)
            formData.append('warranty',productData.warranty)
            productData.sizes.forEach((size) => formData.append('sizes', size));
            productData.colors.forEach((color) => formData.append('colors', color));


            for(let i = 0; i < productData.images.length; i++){
                formData.append('files',productData.images[i])
            }

            dispatch(addProduct(formData));
            toast.success('Product added Successfully')

            setProductData({
                name: '',
                brand: '',
                description: '',
                actualPrice: '',
                offerPrice: '',
                category: '',
                stock: '',
                sizes: [],
                colors: [],
                warranty: '',
                images: [],
                imagePreviews: []
            });
        }

    };

    const handleImageRemove = (index) => {
        setProductData((prevData) => {
            const updatedImages = [...prevData.images];
            const updatedPreviews = [...prevData.imagePreviews];
            updatedImages.splice(index, 1);
            updatedPreviews.splice(index, 1);
            return { ...prevData, images: updatedImages, imagePreviews: updatedPreviews };
        });
    };

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'An error occurred');
        }
    }, [error]);
    

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }
    
    

    
    return (
        <div className='add-product'>
            <div className='container'>
                <div className="product-form">
                    <form onSubmit={handleSubmit}>
                        <div className="product-info">
                            <div className="header">
                                <div className="text">
                                    <p>Add New Product</p>
                                </div>
                                <div className="Btn">
                                    <button type='reset'>Cancel</button>
                                    <button type='submit'>Publish</button>
                                </div>
                            </div>

                            <div className="images">
                                <div className="image-input">
                                    <label>
                                        <span><IoCloudUploadSharp /></span>
                                        <input type="file" name='images' accept="image/*" multiple onChange={handleInput} hidden/>
                                    </label>
                                </div>
                                <div className="image-preview">
                                    {productData.imagePreviews.map((image, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img src={image} alt={`Preview ${index}`} className="preview-image" />
                                            <button
                                                onClick={() => handleImageRemove(index)}
                                                style={{
                                                    position: 'absolute',
                                                    width:'15px',
                                                    height:'15px',
                                                    top: '5px',
                                                    right: '5px',
                                                    background: 'red',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    cursor: 'pointer'
                                                }}>
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Input fields for product details */}
                            <div className="product-details">
                                <div className="product-name">
                                    <label>
                                        Product Name
                                        <input type="text" placeholder='SAMSUNG Galaxy F34 5G' name='name' value={productData.name} onChange={handleInput} />
                                    </label>
                                </div>

                                <div className="brand">
                                    <label>
                                        Brand
                                        <input type="text" placeholder='Puma, adidas, redmi' name='brand' value={productData.brand} onChange={handleInput} />
                                    </label>
                                </div>

                                <div className="description">
                                    <label>
                                        Description
                                        <textarea placeholder='About Product' name='description' value={productData.description} onChange={handleInput} />
                                    </label>
                                </div>

                                <div className="sale-price">
                                    <label>
                                        Sales Price
                                        <input type="number" placeholder='999' name='offerPrice' value={productData.offerPrice} onChange={handleInput} />
                                    </label>
                                </div>

                                <div className="actual-price">
                                    <label>
                                        Actual Price
                                        <input type="number" placeholder='1599' name='actualPrice' value={productData.actualPrice} onChange={handleInput} />
                                    </label>
                                </div>

                                <div className="stock">
                                    <label>
                                        Stock
                                        <input type="number" placeholder='10' name='stock' value={productData.stock} onChange={handleInput} />
                                    </label>
                                </div>

                                {/* Category and Size selection */}
                                <div className="category">
                                    <label>
                                        Select Category
                                        <select name="category" value={productData.category} onChange={handleCategoryChange}>
                                            <option value="null">Select Category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="beauty">Beauty</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="health">Health</option>
                                            <option value="education">Education</option>
                                        </select>
                                    </label>
                                </div>

                                

                                {/* Color selection */}
                                <div className="colors">
                                    <p>Select Available Colors</p>
                                    <div className="color-options">
                                        {colors.map((color, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleColorSelect(color)}
                                                style={{
                                                    backgroundColor: color,
                                                    width: '25px',
                                                    height: '25px',
                                                    margin: '5px',
                                                    display: 'inline-block',
                                                    cursor: 'pointer',
                                                    borderRadius: 50,
                                                    border: productData.colors.includes(color) ? '2px solid green' : 'none' 
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {availableSizes.length > 0 && (
                                    <div className="sizes">
                                        <p>Select Available Sizes</p>
                                        <ul>
                                            {availableSizes.map(size => (
                                                <li
                                                    key={size}
                                                    onClick={() => handleSizeSelect(size)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: productData.sizes.includes(size) ? '#333' : 'transparent',
                                                        color : productData.sizes.includes(size) ? 'white' : 'white'
                                                    }}>
                                                    {size}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="warranty">
                                    <label>
                                        Warranty
                                        <input type="number" placeholder='e.g., 2' name='warranty' value={productData.warranty} onChange={handleInput} />
                                    </label>
                                </div>

                                    <div className="note">
                                        <span><IoMdInformationCircle /></span>
                                        <p>Before adding images, please watch this video</p>
                                    </div>
                                </div>
                            </div>

                            {/* Image upload section */}

                                
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};

export default AddProducts;
