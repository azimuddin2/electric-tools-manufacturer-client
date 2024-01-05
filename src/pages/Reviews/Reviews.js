import React from 'react';
import useReview from '../../hooks/useReview';
import Loading from '../Shared/Loading/Loading';
import Review from './Review';
import ErrorMessage from '../Shared/ErrorMessage/ErrorMessage';
import useTitle from '../../hooks/useTitle';

const Reviews = () => {
    useTitle('Reviews');
    const [testimonials, isLoading, error] = useReview();

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    return (
        <section className='max-w-screen-lg lg:mx-auto mx-5 my-12 lg:my-16'>
            <div className='text-center'>
                <p className='text-primary font-semibold text-lg'>Reviews</p>
                <h1 className='text-2xl lg:text-3xl leading-snug text-secondary'>What Customer Says</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10'>
                {
                    testimonials?.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Reviews;