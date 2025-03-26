import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/emptyData.css'

const EmptyData = () => {
  const navigate = useNavigate();
  const image = "https://res.cloudinary.com/dxrfohx12/image/upload/v1742120649/0d623b8f-8043-4c5d-9dbb-15024e2ba900.png";

  return (
    <div className="empty-data-container">
      <img src={image} alt="No Data Found" className="empty-image" />
      <h2 className="empty-title">Oops! No Data Found</h2>
      <p className="empty-message">
        It looks like there's nothing here. Try going back to the homepage and exploring more products.
      </p>
      <button className="home-button" onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default EmptyData;
