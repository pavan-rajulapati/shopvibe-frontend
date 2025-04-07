import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReviewAction } from "../redux/actions/review.action";
import '../styles/review.css'
import LocalTime from "../utils/LocalTime";
import { FaArrowRight } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import StarRating from "../middleware/StarRating";


const Review = ({ productId }) => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.review);
    const [showReviewForm, setShowReviewForm] = useState(false)

    function handleShowForm(){
        setShowReviewForm(!showReviewForm)
    }

    useEffect(() => {
        if (productId) {
            dispatch(ReviewAction(productId));
        }
    }, [dispatch, productId]);


    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error: {error}</p>;

    const reviews = data?.data || [];

    return (
        <div className="review-section">
            <div className="btn">
                <button onClick={handleShowForm}>Write your review <FaArrowRight /></button>
            </div>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="review">
                        <div className="user-info">
                            <img src={review.userId.profilePic} alt="hello" />
                            <div className="comment-review">
                                <div className="user-info">
                                    <p><strong>{review.userId.userName}</strong></p>
                                    <span className="date"><LocalTime dateAndTime={review.createdAt}></LocalTime></span>
                                </div>
                                <div className="review-rating">
                                    <div className="rating">
                                        <p><StarRating rating = {review.rating}/></p>
                                    </div>
                                    <div className="review">
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                
            ) : (
                <div className="empty">
                    <img src="https://res.cloudinary.com/dxrfohx12/image/upload/v1742103070/noData_ezcshk.jpg" alt="review" />
                    <p>No reviews available on this product</p>
                </div>
            )}
            {showReviewForm && <ReviewForm handleShowForm = {handleShowForm} productId = {productId}></ReviewForm>}
        </div>
    );
};

export default Review;

