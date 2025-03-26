import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from '../middleware/Firebase';  
import { signInWithPopup } from "firebase/auth";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import { storeToken } from '../middleware/token';  // Import storeToken function
import '../styles/signin.css';

const GoogleLogin = () => {
  const navigate = useNavigate(); 

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email || !user.uid) {
        toast.error("Failed to get user information from Google.");
        return;
      }

      const email = user.email;
      const googleUid = user.uid;

      const url = process.env.REACT_APP_BACKEND_URL;  

      let response = await axios.post(
        `${url}/google-login`,
        { email, googleUid },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.authToken) {
        storeToken(response.data.authToken);  // Use storeToken function
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message || "Unauthorized user");
        } else if (error.response.status === 500) {
          toast.error("Internal server error");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Unable to process the request");
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
