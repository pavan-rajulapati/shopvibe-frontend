import React from 'react'
import '../styles/sellerenterpage.css'
import {Link} from 'react-router-dom'

const SellerEnterPage = () => {
	return (
		<div>
			<div className="seller-homepage-section">
				<div className="seller-container">
					<div className="info-section">
						<span>Sell Smarter, Grow Faster!</span>
						<p>
							Welcome to the ultimate platform for sellers! Whether you're a small business or a large enterprise,
							our marketplace empowers you to reach more customers, boost sales, and scale your business effortlessly.
							With easy product management, secure payments, and powerful analytics, selling has never been easier.
							Join us today and take your business to new heights! 🚀💼
						</p>
						<div className="btn">
							<Link to={'/seller/registration'}><button>Start your bussiness now</button></Link>
						</div>
					</div>
					<div className="image-section">
						<img src="/photos/seller-homepage-img.png" alt="seller-image" width={400} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default SellerEnterPage