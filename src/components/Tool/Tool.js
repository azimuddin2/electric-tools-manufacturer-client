import React from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const Tool = ({ tool }) => {
    const { _id, name, image, price, rating } = tool;
    const navigate = useNavigate();

    return (
        <div className="card lg:shadow-none shadow hover:shadow">
            <figure>
                <img className='w-56 mt-1 mx-auto' src={image} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-secondary">{name}</h2>
                <p className='font-medium text-secondary'>Price: <span className=' text-primary'>${price}</span></p>
                <div className="mb-1">
                    <StarRatings
                        rating={rating}
                        starRatedColor="#ff9800"
                        name="rating"
                        starSpacing="1px"
                        starDimension="19px"
                    />
                </div>
                <div className="card-actions justify-start">
                    <button
                        onClick={() => navigate(`/tool/${_id}`)}
                        className='btn btn-sm btn-primary text-white capitalize rounded-md'
                    >
                        Buy Now <MdOutlineShoppingCart className='text-xl ml-1' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tool;