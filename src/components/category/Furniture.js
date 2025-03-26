import React from 'react';
import '../../styles/category/furniture.css';
import { useNavigate } from 'react-router-dom';

const Furniture = () => {
    const navigate = useNavigate(); 

    const data = [
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103033/furniture-5_o82mpn.webp", name: "Dining Table", category: "furniture" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103029/furniture-4_ptaziz.webp", name: "Wooden beds", category: "furniture" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103028/furniture-3_ou4nph.jpg", name: "Divan sets", category: "furniture" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103028/furniture-2_xr7h9o.webp", name: "Sofa sets", category: "furniture" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103028/furniture-1_w29p6k.avif", name: "Gaming chairs", category: "furniture" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103034/furniture-6_gjygqq.webp", name: "Dressing tables", category: "furniture" },
    ];

    const handleNavigation = (category) => {
        navigate(`/category/${category}`); 
    };

    return (
        <div>
            <div className="furniture-category-section">
                <h1>House Hold Items</h1>
                <div className="container">
                    {data.map((item, index) => (
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
    );
};

export default Furniture;
