import React from 'react';
import { useParams } from 'react-router-dom';
import OrderForm from './OrderForm';
import useTitle from '../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import ErrorMessage from '../Shared/ErrorMessage/ErrorMessage';
import StarRatings from 'react-star-ratings';

const ToolDetails = () => {
    useTitle('Tool Details');
    const { toolId } = useParams();

    const { data: tool = {}, isLoading, error } = useQuery({
        queryKey: ['tool', toolId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tool/${toolId}`);
            const data = await res.json();
            return data;
        }
    })

    const { name, image, price, rating, description, minimumQuantity, availableQuantity } = tool;

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    return (
        <section className='max-w-screen-lg lg:mx-auto mx-5 my-12 lg:my-20'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className="rounded-xl shadow pt-10">
                    <figure>
                        <img src={image} alt={name} className='mx-auto' />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl text-secondary">{name}</h2>
                        <p className='font-medium text-secondary text-lg'>Price: <span className='text-primary'>${price}</span></p>
                        <p className='py-2 text-accent'>{description}</p>
                        <p>Minimum Order Quantity: 0{minimumQuantity}</p>
                        <p>Available Order Quantity: {availableQuantity}</p>
                        <div className="mb-1">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#ff9800"
                                name="rating"
                                starSpacing="1px"
                                starDimension="19px"
                            />
                        </div>
                    </div>
                </div>
                <div className='card shadow'>
                    <OrderForm tool={tool}></OrderForm>
                </div>
            </div>
        </section>
    );
};

export default ToolDetails;