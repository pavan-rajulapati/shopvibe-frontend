import React from 'react';
import '../../styles/category/electronics.css';
import { useNavigate } from 'react-router-dom';

const Electronics = () => {
	const navigate = useNavigate(); 

	const data = [
		{ image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103063/mobile-1_jvzgdq.jpg", name: "Latest 5g mobiles", category: "mobile" },
		{ image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103142/watch-3_qcfnwi.jpg", name: "Bluetooth smart watches", category: "watches" },
		{ image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742117433/electronics-7_npnvkt.jpg", name: "Headphones", category: "headphones" },
		{ image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103070/monitor-2_dok0po.webp", name: "Curved monitors", category: "monitor" },
		{ image: "https://res.cloudinary.com/dxrfohx12/image/upload/v1742103064/mobile-2_ts9hqg.webp", name: "Mobiles under 30,000", category: "mobile" }
	];

	const handleNavigation = (category) => {
		navigate(`/category/${category}`); 
	};

	return (
		<div>
			<div className="electronics-category-section">
				<h1>Electronics</h1>
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

export default Electronics;
