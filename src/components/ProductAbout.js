import React from 'react'
import '../styles/productAbout.css'
import ProductDescription from './ProductDescription'
import Review from './Review'

const ProductAbout = () => {
  return (
    <div>
        <div className="about-product">
            <div className="container">
				<nav>
					<ul>
						<li>
							<span>About Product</span>
						</li>
						<li>
							<span>Ratings & Reviews</span>
						</li>
					</ul>
				</nav>
			</div>
        </div>
    </div>
  )
}			

export default ProductAbout