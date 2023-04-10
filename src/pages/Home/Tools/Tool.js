import React from 'react';
import Button from '../../Shared/Button/Button';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';

const Tool = ({ tool }) => {
    const { _id, name, img, price, rating } = tool;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <figure><img src={img} alt={name}/></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Price: ${price}</p>
                <div className="rating rating-xs flex items-center">
                    <input type="radio" name="rating-6" className="pl-6 mask mask-star-2 bg-orange-500" />
                    {rating}
                </div>
                <div className="card-actions justify-start">
                    <button className='btn btn-sm btn-primary text-white'>
                    Buy Now <FaShoppingCart className='text-lg ml-1'></FaShoppingCart>

                    </button>
                   
                </div>
            </div>
        </div>
    );
};

export default Tool;