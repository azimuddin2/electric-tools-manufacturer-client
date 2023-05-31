import React from 'react';
import useReview from '../../hooks/useReview';
import Loading from '../Shared/Loading/Loading';
import Review from './Review';

const Reviews = () => {
    const [testimonials, isLoading] = useReview();

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='max-w-screen-xl mx-auto px-4 lg:px-8 my-14'>
            <div className='text-center'>
                <p className='text-primary font-semibold text-lg'>Reviews</p>
                <h1 className='text-2xl lg:text-3xl leading-snug text-secondary'>What Customer Says</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
                {
                    testimonials.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Reviews;