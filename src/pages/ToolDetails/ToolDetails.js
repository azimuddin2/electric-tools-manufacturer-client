import React from 'react';
import { useLoaderData } from 'react-router-dom';
import OrderForm from './OrderForm';

const ToolDetails = () => {
    const tool = useLoaderData();
    const { name, img, price, rating, description, minimumQuantity, availableQuantity } = tool;

    return (
        <section className='max-w-screen-xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4 lg:px-12'>
            <div className="rounded-xl shadow-lg">
                <figure>
                    <img src={img} alt={name} className='mx-auto'/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl">{name}</h2>
                    <p className=' font-medium'>Price: <span className=' text-primary'>${price}</span></p>
                    <p className='py-2'>{description}</p>
                    <p>Minimum Order Quantity: {minimumQuantity}</p>
                    <p>Available Order Quantity: {availableQuantity}</p>
                    <div className="rating rating-xs flex items-center">
                        <input type="radio" name="rating-6" className="pl-6 mask mask-star-2 bg-primary" />
                        {rating}
                    </div>
                </div>
            </div>
            <div className='card shadow-lg'>
                <OrderForm tool={tool}></OrderForm>
            </div>
        </section>
    );
};

export default ToolDetails;