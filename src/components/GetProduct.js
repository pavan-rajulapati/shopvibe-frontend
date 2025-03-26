import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAction } from '../redux/actions/getProduct.action';
import { useSearchParams } from 'react-router-dom';
import Loader from './Loader';
import {toast, Toaster} from 'react-hot-toast'
import '../styles/getProduct.css'
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const GetProduct = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { loading, items, currentPage, totalPages, error } = useSelector((state) => state.searchProduct);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            dispatch(GetProductAction({ query, page }));
        } catch (error) {
            toast.error(error || error.message)
        }
    }, [query, page, dispatch]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleProductFetch = async (productId) => {
        try {
            navigate(`/product/${productId}`);
        } catch (error) {
            toast.error(error || error.message)
        }
    }

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {!loading && !error && (
                <div className='Get-Product'>
                    <div className='container'>
                        <div className="items-container">
                            {items.length ? (
                                items.map((item) => (
                                    <div key={item._id} className='item' onClick={() => handleProductFetch(item._id)}>
                                        <div className="image-section">
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.images[0]}`} alt={`Product ${item._id}`} />
                                        </div>
                                        <div className="info-section">
                                            <div>
                                                <span>{item.name}</span>
                                                <p>{item.brand}</p>
                                            </div>
                                            <div>
                                                <h4><MdCurrencyRupee />{item.offerPrice}</h4>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))
                            ) : (
                            <p>No products found</p>
                            )}
                        </div>
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                className={page === 1 && 'disable'}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                className={page === totalPages && 'disable'}
                            >
                                Next
                            </button>
                        </div>
                        <Toaster></Toaster>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetProduct;
