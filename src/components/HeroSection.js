import React from 'react'
import '../styles/heroSection.css'

const HeroSection = () => {
  return (
    <div>
        <div className="hero-section">
            <div className="container">
                <div className="hero">
                    <div className="info">
                        <p className='heading'>Welcome to <span>ShopVibe</span> – Where Shopping Meets Your Vibe!</p>
                        <p className="sub">Shop Your Style, Love the Vibe!</p>
                        <p className="description">
                            Discover the ultimate shopping experience at ShopVibe. From the latest trends in fashion and electronics to unique,
                            handpicked collections tailored to your vibe, we’ve got everything you need to express your style.
                            Join us in creating a world of endless possibilities where quality meets affordability – because you deserve the best,
                            and it’s right here at your fingertips.
                        </p>
                        <div className="btn">
                            <button>Shop Now</button>
                        </div>
                    </div>
                    <div className="image-section">
                        <img src="https://parspng.com/wp-content/uploads/2023/02/shoespng.parspng.com_.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection