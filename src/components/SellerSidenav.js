import {React} from 'react'
import '../styles/seller.css'
import '../styles/sellerSidenav.css'
import { IoIosCube, IoMdAdd } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const SellerSidenav = ({setShowSection}) => {
  return (
    <div className='seller-sidenav'>
        <div className="container">
            <ul>
                <li onClick={()=> setShowSection('orders')}>
                    <span><IoIosCube /></span> 
                    <p>Orders</p>   
                </li>
                <li onClick={()=> setShowSection('addProduct')}>
                    <span><IoMdAdd /></span> 
                    <p>Add Product</p>
                </li>
                <li onClick={()=> setShowSection('products')}>
                    <span><FaBoxOpen /></span> 
                    <p>Products</p>
                </li>
                <li onClick={()=> setShowSection('events')}>
                    <span><IoSparkles /></span> 
                    <p>Add Event</p>
                </li>
                <li>
                    <span><MdLogout /></span> 
                    <p>Logout</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SellerSidenav