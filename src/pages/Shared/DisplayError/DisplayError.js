import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import errorGif from '../../../assets/images/error.gif';
import useTitle from '../../../hooks/useTitle';

const DisplayError = () => {
    useTitle('Error');
    return (
        <div className='my-10 text-center'>
            <img src={errorGif} alt="" className='mx-auto' />
            <Link to="/">
                <button className='btn btn-primary text-white'>
                    <FaHome className='text-xl'></FaHome>
                    <span className='mt-1 ml-1'>Back to Home</span>
                </button>
            </Link>
        </div>
    );
};

export default DisplayError;