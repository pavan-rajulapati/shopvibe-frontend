import React, { useEffect } from 'react';
import '../styles/subNavCategory.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductByCategoryAction } from '../redux/actions/getProductByCategory.action';
import Loader from './Loader';
import { resetCategoryState } from '../redux/reducers/getProductByCategory.reducer';
import EmptyData from './EmptyData';

const CategoryProduct = () => {
	const { category } = useParams(); 
	const dispatch = useDispatch();

	const { loading, error, items, status } = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(resetCategoryState());
		dispatch(GetProductByCategoryAction(category));
	}, [dispatch, category]);

	if (loading || status === 'pending') {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<span>{error}</span>
			</div>
		);
	}

	return (
		<div>
			<div className="category-section">
				<div className="container">
					{status === 'fulfilled' && items.length === 0 && (
						<EmptyData/>
					)}
					{items.length > 0 && (
						<div className="category-items">
							{items.map((product) => (
								<div key={product._id} className="product-card">
									<div className="image-container">
										<img src={`${process.env.REACT_APP_BACKEND_URL}/${product.images[0]}`} alt={product.name} />
									</div>
									<div className="info-container">
										<p>{product.name}</p>
										<p>&#8377;{product.actualPrice}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoryProduct;
