import React, { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../styles/signup.css';
import { Link } from 'react-router-dom';
import GoogleSignup from '../components/GoogleSignup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

const Signup = () => {

	const [userData, setUserData] = useState({
		userName : '',
		email: '',
		password: ''
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleInput = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({
		...prevData,
		[name]: value
		}));
	};

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		if (userData.userName === '' || userData.email === '' || userData.password === '') {
		toast.error('Enter credentials');
		} else if (!validateEmail(userData.email)) {
		toast.error('Enter a valid email');
		} else {
		setIsLoading(true);
		try {
			let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, userData,{
			withCredentials:true
			});
			if (response.status === 200) {
			localStorage.setItem('authToken', response.data.authToken)
			navigate('/');
			}
		} catch (error) {
			if (error.response) {
			if (error.response.status === 409) {
				toast.error(error.response.data.message || 'Unauthorized user');
			} else if (error.response.status === 500) {
				toast.error('Internal server error');
			} else {
				toast.error('Something went wrong');
			}
			} else {
			console.error('Error during Google login:', error);
			toast.error('Unable to process the request');
			}
		} finally {
			setIsLoading(false);
		}
		}
	};
	return (
		<div className='signup-main-container'>
			<div className='signup-container'>
				<div className='image-section'>
					<img src="https://res.cloudinary.com/dxrfohx12/image/upload/v1742102921/5179440_vryrej.jpg" alt="signup-image" />
				</div>
					<div>
					<div className="signup">
						<div className="container">
							<form onSubmit={handleLogin}>
								<span className='head'>Welcome guys</span>
								<p>Please enter your details to Signup</p>
								<div className="userName">
									<input
										type="text"
										placeholder='Username'
										name='userName'
										value={userData.userName}
										onChange={handleInput}
									/>
									<span><FaRegUser /></span>
								</div>
								<div className="mail">
									<input
										type="text"
										placeholder='Email'
										name='email'
										value={userData.email}
										onChange={handleInput}
										autoComplete='off'
									/>
									<span><IoIosMail /></span>
								</div>
								<div className="password">
									<input
										type={showPassword ? "text" : "password"}
										placeholder='Password'
										name='password'
										value={userData.password}
										onChange={handleInput}
										autoComplete='off'
									/>
									<span onClick={togglePasswordVisibility}>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</span>
								</div>
								<div className="btn">
									<button type='submit' disabled={isLoading}>
										{isLoading ? 'loading...' : 'signup'}
									</button>
								</div>
							</form>
							<div className="or-divider">
								<span>or</span>
							</div>
							<div className="googleAuth">
								<GoogleSignup />
							</div>
							<div className="exist">
								<p>Already have an account? <Link to={'/signin'}>Signin</Link></p>  
							</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	)
}

export default Signup