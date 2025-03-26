import React, { useState, useEffect } from 'react';
import '../styles/userDetails.css';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { addUserDetails } from '../redux/actions/userDetails.action'
import { useNavigate } from 'react-router-dom';

const AddUserDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, userDetails } = useSelector((state) => state.userDetails); 

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        mobileNumber: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleGenderChange = (e) => {
        setUserData((prevData) => ({
            ...prevData,
            gender: e.target.value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!userData.firstName || !userData.lastName || !userData.gender || !userData.dateOfBirth || !userData.mobileNumber) {
            toast.error("All fields are required!");
        } else if (userData.mobileNumber.length !== 10) {
            toast.error('Enter a valid mobile number');
        } else {
            await dispatch(addUserDetails(userData));
        }
    };

    useEffect(() => {

        if (!loading && !error && userDetails !== null) {
            navigate('/profile');
        }
        if (error) {
            toast.error(error);
        }
    }, [loading, error, userDetails, navigate]);

    return (
        <div>
            <Toaster />
            <div className="user-details">
                <div className="container">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    First Name
                                    <input
                                        type="text"
                                        placeholder="Joseph"
                                        name="firstName"
                                        value={userData.firstName}
                                        onChange={handleInput}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Last Name
                                    <input
                                        type="text"
                                        placeholder="Garapati"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={handleInput}
                                    />
                                </label>
                            </div>
                            <div className="gender">
                                Gender
                                <label>
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={userData.gender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                </label>
                                <label>
                                    Female
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={userData.gender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                </label>
                                <label>
                                    Others
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="others"
                                        checked={userData.gender === 'others'}
                                        onChange={handleGenderChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Date Of Birth
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={userData.dateOfBirth}
                                        onChange={handleInput}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Mobile Number
                                    <input
                                        type="number"
                                        placeholder="9988998899"
                                        name="mobileNumber"
                                        value={userData.mobileNumber}
                                        onChange={handleInput}
                                    />
                                </label>
                            </div>
                            <div className="Btn">
                                <button type="submit">Add Details</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddUserDetails;
