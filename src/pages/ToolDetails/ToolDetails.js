import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ToolDetails = () => {
    const tool = useLoaderData();

    return (
        <div className='py-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-8'>
        <div className="card shadow-xl">
            <figure><img src={tool.img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{tool.name}</h2>
                <p>Price: ${tool.price}</p>
                <p>{tool.description}</p>
                <p>Minimum Order Quantity: {tool.minimumQuantity}</p>
                <p>Available Order Quantity {tool.availableQuantity}</p>
                <div className="rating rating-xs flex items-center">
                    <input type="radio" name="rating-6" className="pl-6 mask mask-star-2 bg-orange-500" />
                    {tool.rating}
                </div>
            </div>
        </div>
        <div className='card shadow-xl'>
            {/* {
                <OrderForm
                    key={tool._id}
                    tool={tool}></OrderForm>
            } */}
        </div>
    </div>
    );
};

export default ToolDetails;