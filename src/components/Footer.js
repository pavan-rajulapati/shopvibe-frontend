import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <div>
        <div className="footer-section">
            <div className="container">
                <div className="footer">
                    <div className='info-section'>
                        <ul>
                            <span>About Us</span>
                            <li>Services</li>
                            <li>Policy</li>
                            <li>Terms and Conditions</li>
                        </ul>
                        <ul>
                            <span>Support</span>
                            <li>Call support</li>
                            <li>Email</li>
                            <li>Watsapp</li>
                            <li>Social media</li>
                        </ul>
                        <ul>
                            <span>Category's</span>
                            <li>Electronics</li>
                            <li>Fashion</li>
                            <li>Footware</li>
                            <li>Beauty</li>
                            <li>Grocery</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div className="form">
                        <form action="">
                            <input type="text" placeholder='Email' />
                            <button type='submit'>Add mail</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer