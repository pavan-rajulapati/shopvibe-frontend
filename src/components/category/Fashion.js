import React from 'react';
import '../../styles/category/fashion.css';
import { useNavigate } from 'react-router-dom';

const Fashion = () => {
    const navigate = useNavigate(); 

    const data = {
        mens: [
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103131/shirt-1_apsda5.webp", name: "Mens plain shirts", category: "mens-clothing" },
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103091/pant-1_zipsu5.avif", name: "Mens cargo Pants", category: "mens-clothing" },
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103092/pant-2_awmdot.jpg", name: "Plain pants for mens", category: "mens-clothing" },
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103133/shirt-3_ffpnl5.webp", name: "Plain shirts for mens", category: "mens-clothing" },
        ],
        womens: [
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103142/women-1_w5cyte.webp", name: "Women Dress", category: "womens-clothing" },
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103146/women-3_curjj8.webp", name: "Women Dress", category: "womens-clothing" },
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103148/women-4_fbrof7.jpg", name: "Women Dress", category: "womens-clothing" },
            { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103092/pant-5_cerlpq.webp", name: "Women Pant", category: "womens-clothing" },
        ]
    };
    

    const handleNavigation = (category) => {
        navigate(`/category/${category}`); 
    };

    return (
        <div>
            <div className="fashion-category-section">
                <h1>Fashion</h1>
                <div className="container">
                    <div className="mens-ware">
                        {data.mens.map((item, index) => (
                            <div key={index} className="card-section" onClick={() => handleNavigation(item.category)}>
                                <div className="image-section">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="info-section">
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="womens-ware">
                        {data.womens.map((item, index) => (
                            <div key={index} className="card-section" onClick={() => handleNavigation(item.category)}>
                                <div className="image-section">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="info-section">
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fashion;
