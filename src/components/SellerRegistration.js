import React, { useEffect, useState } from 'react';
import {toast, Toaster} from 'react-hot-toast'
import '../styles/SellerRegistration.css'
import {useDispatch, useSelector} from 'react-redux'
import { AddSellerDetails } from '../redux/actions/sellerRegistration.action';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { UserDataAction } from '../redux/actions/userData.action';


const SellerRegistration = () => {

	const dispatch = useDispatch()
	const {loading} = useSelector((state) => state.addSeller)
	const data = useSelector((state) => state.userData)
	const navigate = useNavigate()
	const [step, setStep] = useState(1); 
	const totalSteps = 3
	const [sellerRegisterData, setSellerRegisterData] = useState({
		name: '',
		email: '',
		mobileNumber: '',
		profilePic: '',
		street: '',
		city: '',
		pincode: '',
		state: '',
		country: '',
		holderName: '',
		bankName: '',
		accountNumber: '',
		ifscCode: '',
	});

	useEffect(() => {
		dispatch(UserDataAction())
	}, [dispatch])

	console.log('user data', data.data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerRegisterData({
      ...sellerRegisterData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSellerRegisterData((prevData) => ({
        ...prevData,
        profilePic: file,
      }));
    }
  };

  const validateStep = () => {
    const { name, email, mobileNumber, street, city, pincode, state, country, holderName, bankName, accountNumber, ifscCode } = sellerRegisterData;

    if (step === 1) {
      if (!name) return toast.error('Name is required');
      if (!email || !/\S+@\S+\.\S+/.test(email)) return toast.error('Enter a Valid Mail');
      if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) return toast.error('Enter Valid Number');
    }

    if (step === 2) {
      if (!street) return toast.error('Street is required');
      if (!city) return toast.error('City is required');
      if (!pincode || !/^\d{6}$/.test(pincode)) return toast.error('Enter Valid Pincode');
      if (!state) return toast.error('State is required');
      if (!country) return toast.error('Country is required');
    }

    if (step === 3) {
      if (!holderName) return toast.error('Account holder name is required');
      if (!bankName) return toast.error('Bank name is required');
      if (!accountNumber || !/^\d{9,18}$/.test(accountNumber)) return toast.error('Enter a Valid account number');
      if (!ifscCode || !/^[A-Za-z]{4}\d{7}$/.test(ifscCode)) return toast.error('Enter a Valid IFSC code');
    }

    return true;
  };

  const nextStep = (e) => {
	e.preventDefault();
    if (validateStep() === true) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = (e) => {
	e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	if (validateStep() === true) {
	  try {
		await dispatch(AddSellerDetails(sellerRegisterData)).unwrap();
		navigate('/seller');
	  } catch (error) {
		toast.error(error.message || 'An error occurred during registration');
	  }
	}
  };
  
	
	if(loading){
		return(
			<div>
				<Loader></Loader>
			</div>
		)
	}

  return (
    <div className="seller-form">
		<div className="container">
			<div className="progress-bar-container">
				<div
				className="progress-bar"
				style={{
					width: `${(step / totalSteps) * 100}%`,
					backgroundColor: '#333',
					height: '15px',
				}}
				/>
			</div>
				<form onSubmit={handleSubmit}>
					{step === 1 && (	
						<div className="personal-info">
							<h2>Personal Details</h2>
							<label className='profile-photo'>
								<input
								type="file"
								name="profilePic"
								onChange={handleFileChange}
								/>
								<img src={sellerRegisterData.profilePic ? URL.createObjectURL(sellerRegisterData.profilePic) : "/photos/user.avif"} alt='profilepic'></img>
							</label>
							<label>
								Name:
								<input
								type="text"
								name="name"
								value={sellerRegisterData.name}
								onChange={handleChange}
								placeholder='John Doe'
								/>
							</label>
							<label>
								Email:
								<input
								type="email"
								name="email"
								value={sellerRegisterData.email}
								onChange={handleChange}
								placeholder='johndoe@example.com'
								/>
							</label>
							<label>
								Mobile Number:
								<input
								type="number"
								name="mobileNumber"
								value={sellerRegisterData.mobileNumber}
								onChange={handleChange}
								placeholder='1234567890'
								/>
							</label>
							<div className='buttons'>
								<button type="button" onClick={nextStep}>
									Next
								</button>
							</div>
							</div>
					)}

					{step === 2 && (
							<div className="address">
							<h2>Address</h2>
							<label>
								Street:
								<input
								type="text"
								name="street"
								value={sellerRegisterData.street}
								onChange={handleChange}
								placeholder='123 Baker Street'
								/>
							</label>
							<label>
								City:
								<input
								type="text"
								name="city"
								value={sellerRegisterData.city}
								onChange={handleChange}
								placeholder='London'
								/>
							</label>
							<label>
								Pincode:
								<input
								type="number"
								name="pincode"
								value={sellerRegisterData.pincode}
								onChange={handleChange}
								placeholder='567890'
								/>
							</label>
							<label>
								State:
								<input
								type="text"
								name="state"
								value={sellerRegisterData.state}
								onChange={handleChange}
								placeholder='England'
								/>
							</label>
							<label>
								Country:
								<input
								type="text"
								name="country"
								value={sellerRegisterData.country}
								onChange={handleChange}
								placeholder='UK'
								/>
							</label>
							<div className='buttons'>
								<button type="button" onClick={prevStep}>
									Back
								</button>
								<button type="button" onClick={nextStep}>
									Next
								</button>
							</div>
							</div>
					)}

					{step === 3 && (
							<div className="bank-details">
							<h2>Bank Information</h2>
							<label>
								Account Holder Name:
								<input
								type="text"
								name="holderName"
								value={sellerRegisterData.holderName}
								onChange={handleChange}
								placeholder='John Doe'
								/>
							</label>
							<label>
								Bank Name:
								<input
								type="text"
								name="bankName"
								value={sellerRegisterData.bankName}
								onChange={handleChange}
								placeholder='ICICI'
								/>
							</label>
							<label>
								Account Number:
								<input
								type="number"
								name="accountNumber"
								value={sellerRegisterData.accountNumber}
								onChange={handleChange}
								placeholder='123456789'
								/>
							</label>
							<label>
								IFSC Code:
								<input
								type="text"
								name="ifscCode"
								value={sellerRegisterData.ifscCode}
								onChange={handleChange}
								placeholder='ICICI00123'
								/>
							</label>
							<div className='buttons'>
								<button type="button" onClick={prevStep}>
									Back
								</button>
								<button type="submit">Submit</button>
							</div>
						</div>
					)}
				</form>
		</div>
	  <Toaster/>
    </div>
  );
};

export default SellerRegistration;
