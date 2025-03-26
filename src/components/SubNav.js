import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/subNav.css';
import { useDispatch } from 'react-redux';
import { GetProductByCategoryAction } from '../redux/actions/getProductByCategory.action';

const SubNav = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const handleClick = (e) => {
		const value = e.target.getAttribute('value'); 
		if (value) {
		navigate(`/category/${value}`); 
		dispatch(GetProductByCategoryAction(value))
		console.log(value)
		}
	};

	return (
		<div>
			<div className="sub-nav">
				<div className="container">
					<div className="nav">
						<nav>
							<ul onClick={handleClick}>
								<li value="mobile">Mobiles</li>
								<li value="electronics">Electronics</li>
								<li value="mensWare">Mens Ware</li>
								<li value="womensWare">Women's Ware</li>
								<li value="fashion">Beauty</li>
								<li value="home-kitchen">Home & Kitchen</li>
								<li value="furniture">Furniture</li>
								<li value="grocery">Grocery</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);	
};

export default SubNav;
