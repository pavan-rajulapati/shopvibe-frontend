import React from "react";
import { FaStar } from "react-icons/fa";
import "../styles/starRating.css";

const StarRating = ({ rating }) => {
	return (
		<div className="star-rating-container">
			{[...Array(5)].map((_, index) => (
				<span key={index} className={index < rating ? "star-filled" : "star-empty"}>
					<FaStar />
				</span>
			))}
		</div>
	);
};

export default StarRating;
