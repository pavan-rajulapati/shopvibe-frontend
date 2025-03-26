import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '../src/redux/store';
import Signin from './pages/Signin';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Seller from './pages/Seller';
import Navbar from './components/Navbar';
import SellerEnterPage from './components/SellerEnterPage';
import AddUserDetails from './components/AddUserDetails';
import GetProduct from './components/GetProduct';
import Product from './components/Product';
import Review from './components/Review';
import CategoryPage from './components/CategoryProduct';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import SellerRegistration from './components/SellerRegistration';
import StarRating from './middleware/StarRating';
import Footer from './components/Footer';

const App = () => {
    return (
        <Provider store={Store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Protected Routes */}
                    <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
                    <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                    <Route path="/products" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
                    <Route path="/seller" element={<ProtectedRoutes><Seller /></ProtectedRoutes>} />
                    <Route path="/seller/homepage" element={<ProtectedRoutes><SellerEnterPage /></ProtectedRoutes>} />
                    <Route path="/user/details" element={<ProtectedRoutes><AddUserDetails /></ProtectedRoutes>} />
                    <Route path="/product/search" element={<ProtectedRoutes><GetProduct /></ProtectedRoutes>} />
                    <Route path="/product/:id" element={<ProtectedRoutes><Product /></ProtectedRoutes>} />
                    <Route path="/review" element={<ProtectedRoutes><Review /></ProtectedRoutes>} />
                    <Route path="/category/:category" element={<ProtectedRoutes><CategoryPage /></ProtectedRoutes>} />
                    <Route path="/payment/success" element={<ProtectedRoutes><PaymentSuccess /></ProtectedRoutes>} />
                    <Route path="/payment/failure" element={<ProtectedRoutes><PaymentFailure /></ProtectedRoutes>} />
                    <Route path="seller/registration" element={<ProtectedRoutes><SellerRegistration /></ProtectedRoutes>} />
                    <Route path="rating" element={<ProtectedRoutes><StarRating /></ProtectedRoutes>} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
