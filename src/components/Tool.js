import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Tool = ({ tool }) => {
    const { _id, name, img, price, rating } = tool;
    const navigate = useNavigate();

    return (
        <div className="card shadow-lg">
            <figure>
                <img className='w-56 mt-1' src={img} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className=' font-medium'>Price: <span className=' text-primary'>${price}</span></p>
                <div className="rating rating-xs flex items-center">
                    <input type="radio" name="rating-6" className="pl-6 mask mask-star-2 bg-primary" />
                    {rating}
                </div>
                <div className="card-actions justify-start">
                    <button
                        onClick={() => navigate(`/tool/${_id}`)}
                        className='btn btn-sm btn-primary text-white'
                    >
                        Buy Now <FaShoppingCart className='text-lg ml-1'></FaShoppingCart>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tool;