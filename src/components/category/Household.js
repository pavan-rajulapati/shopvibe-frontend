import React from 'react';
import '../../styles/category/household.css';
import { useNavigate } from 'react-router-dom';

const HouseHold = () => {
    const navigate = useNavigate(); 

    const data = [
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103039/home-need-7_i4g4dx.webp", name: "Lamp light", category: "light" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103039/home-need-4_jckkyp.webp", name: "Bed sheets", category: "bed-sheet" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103039/home-need-6_ofjrkk.jpg", name: "Water bottle combo", category: "water-bottle" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103034/home-need-1_jjsnnq.jpg", name: "Door curtens", category: "door-curtens" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103035/home-need-3_ln6eq8.avif", name: "Door mats", category: "door-mats" },
        { image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103137/tap_ew4mfw.jpg", name: "Steel water taps", category: "water-taps" },
    ];

    const handleNavigation = (category) => {
        navigate(`/category/${category}`); 
    };

    return (
        <div>
            <div className="household-category-section">
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

export default HouseHold;
