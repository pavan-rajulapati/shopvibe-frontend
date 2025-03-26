import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from '../middleware/Firebase';  
import { signInWithPopup } from "firebase/auth";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import '../styles/signin.css'

const GoogleLogin = () => {
	const navigate = useNavigate(); 

	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			
			const email = user.email;
			const googleUid = user.uid;
			const userName = user.displayName;
			const providerId = user.providerData[0].providerId; 
			const profilePic = user.photoURL;        

			const url = process.env.REACT_APP_BACKEND_URL;  
	
			let response = await axios.post(`${url}/google-signup`, {
				email,
				googleUid,
				userName,
				providerId,
				profilePic
			},{
				withCredentials : true
			});
	
			if(response.status === 200){
				navigate('/')
				localStorage.setItem('authToken', response.data.authToken)
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
		}
	};
	

	return (
		<div>
			<div className="googleLogin" onClick={handleGoogleLogin}>
				<span><FaGoogle /> Continue with Google</span>
			</div>
			<Toaster />
		</div>
	);
};

export default GoogleLogin;
