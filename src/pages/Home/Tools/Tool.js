import React from 'react';
import Button from '../../Shared/Button/Button';

const Tool = ({ tool }) => {
    const { _id, name, img, description, price, minimumQuantity, availableQuantity, rating } = tool;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Price: ${price}</p>
                {/* <p>{description}</p> */}
                <p>Minimum Order Quantity: {minimumQuantity}</p>
                <p>Available Order Quantity {availableQuantity}</p>
                <div className="rating rating-xs flex items-center">
                    <input type="radio" name="rating-6" className="pl-6 mask mask-star-2 bg-orange-500" />
                    {rating}
                </div>
                <div className="card-actions justify-start">
                    <Button>Buy Now
                        {/* <FontAwesomeIcon className='ml-2' icon={faShoppingCart}></FontAwesomeIcon> */}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Tool;