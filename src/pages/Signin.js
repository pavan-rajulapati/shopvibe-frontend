import React, { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../styles/signin.css';
import { Link } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signin = () => {
  const [userData, setUserData] = useState({
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

    if (userData.email === '' || userData.password === '') {
      toast.error('Enter credentials');
    } else if (!validateEmail(userData.email)) {
      toast.error('Enter a valid email');
    } else {
      setIsLoading(true);
      try {
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, userData,{
          withCredentials: true
        });
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.authToken)
          navigate('/');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
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
    <div>
      <div className="signin">
        <div className="container">
          <form onSubmit={handleLogin}>
            <span className='head'>Welcome back</span>
            <p>Please enter your details to login</p>
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
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <div className="or-divider">
            <span>or</span>
          </div>
          <div className="googleAuth">
            <GoogleLogin />
          </div>
          <div className="exist">
            <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
