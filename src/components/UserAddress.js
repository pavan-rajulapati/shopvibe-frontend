import React, { useState } from 'react';
import '../styles/userAddress.css';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { addUserAddress } from '../redux/actions/userAddress.action';

const UserAddress = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const [userDetails, setUserDetails] = useState({
		name : '',
		mobileNumber : null,
		landMark : '',
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

	const handleInput = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const validateForm = () => {
		const {
			name,
			mobileNumber,
			landMark,
			street,
			city,
			pincode,
			state,
			country,
			holderName,
			bankName,
			accountNumber,
			ifscCode,
		} = userDetails;


		if (!name || street.length < 2) return 'Name must be at least 2 characters.';
		if (!mobileNumber || street.length !== 10) return 'Enter valid mobile number';
		if (!landMark || street.length < 2) return 'land mark must be at least 2 characters.';
		if (!street || street.length < 2) return 'Street must be at least 2 characters.';
		if (!city || city.length < 2) return 'City must be at least 2 characters.';
		if (!pincode || pincode.length !== 6) return 'Pincode must be exactly 6 digits.';
		if (!state || state.length < 2) return 'State must be at least 2 characters.';
		if (!country || country.length < 2) return 'Country must be at least 2 characters.';
		if (!holderName || holderName.length < 2) return 'Account Holder Name must be at least 2 characters.';
		if (!bankName || bankName.length < 2) return 'Bank Name must be at least 2 characters.';
		if (!accountNumber || accountNumber.length < 8 || accountNumber.length > 12)
			return 'Account Number must be between 8 and 12 characters.';
		if (!ifscCode || ifscCode.length < 4) return 'IFSC Code must be at least 4 characters.';

		return null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const error = validateForm();

		if (error) {
			toast.error(error);
			return;
		}

		setLoading(true);
		try {
			await dispatch(addUserAddress(userDetails));
			toast.success('Address and bank details added successfully!');
			setUserDetails({
				name : '',
				landMark : '',
				mobileNumber : '',
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
		} catch (err) {
			toast.error('Failed to add details. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="userAddress">
				<div className="container">
					<div className="imageSection">
						<h1>Share your delivery address with us</h1>
						<img src="https://res.cloudinary.com/dxrfohx12/image/upload/v1742102924/delivery_ttw7gs.jpg" alt="Delivery" />
					</div>
					<form onSubmit={handleSubmit}>
						{loading && <Loader />}
						<div className='inputs'>
							<label className='name'>
								Full Name
								<input
									type="text"
									value={userDetails.name}
									name="name"
									onChange={handleInput}
									placeholder="John Doe"
								/>
							</label>
							<label className='mobileNumber'>
								Mobile Number
								<input
									type="number"
									value={userDetails.mobileNumber}
									name="mobileNumber"
									onChange={handleInput}
									placeholder="+1234567890"
								/>
							</label>
							<label className='landMark'>
								Land Mark
								<input
									type="text"
									value={userDetails.landMark}
									name="landMark"
									onChange={handleInput}
									placeholder="Near Central Park"
								/>
							</label>
							<label className='street'>
								Street
								<input
									type="text"
									value={userDetails.street}
									name="street"
									onChange={handleInput}
									placeholder="123 Main Street, Apt 4B"
								/>
							</label>
							<label className='city'>
								City
								<input
									type="text"
									value={userDetails.city}
									name="city"
									onChange={handleInput}
									placeholder="New York"
								/>
							</label>
							<label className='pincode'>
								Pincode
								<input
									type="number"
									value={userDetails.pincode}
									name="pincode"
									onChange={handleInput}
									placeholder="10001"
								/>
							</label>
							<label className='state'>
								State
								<input
									type="text"
									value={userDetails.state}
									name="state"
									onChange={handleInput}
									placeholder="NY"
								/>
							</label>
							<label className='country'>
								Country
								<input
									type="text"
									value={userDetails.country}
									name="country"
									onChange={handleInput}
									placeholder="USA"
								/>
							</label>
							<label className='holderName'>
								Account Holder Name
								<input
									type="text"
									value={userDetails.holderName}
									name="holderName"
									onChange={handleInput}
									placeholder="John Doe"
								/>
							</label>
							<label className='bankName'>
								Bank Name
								<input
									type="text"
									value={userDetails.bankName}
									name="bankName"
									onChange={handleInput}
									placeholder="ICICI"
								/>
							</label>
							<label className='accountNumber'>
								Account Number
								<input
									type="number"
									value={userDetails.accountNumber}
									name="accountNumber"
									onChange={handleInput}
									placeholder="111122223333"
								/>
							</label>
							<label className='ifscCode'>
								IFSC Code
								<input
									type="text"
									value={userDetails.ifscCode}
									name="ifscCode"
									onChange={handleInput}
									placeholder="ICICI0011"
								/>
							</label>
						</div>
						<div className='submit-section'>
							<button type="submit">Add Details</button>
						</div>
					</form>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default UserAddress;
