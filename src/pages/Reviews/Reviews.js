import React from 'react';
import useReview from '../../hooks/useReview';
import Loading from '../Shared/Loading/Loading';
import Testimonial from '../../components/Testimonial';

const Reviews = () => {
    const [testimonials, isLoading] = useReview();

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='my-10 max-w-screen-xl mx-auto'>
            <div className='text-center'>
                <p className='text-primary font-semibold text-lg'>Reviews</p>
                <h1 className='text-2xl lg:text-3xl leading-snug text-secondary'>What Customer Says</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    testimonials.map(testimonial => <Testimonial
                        key={testimonial._id}
                        testimonial={testimonial}
                    ></Testimonial>)
                }
            </div>
        </section>
    );
};

export default Reviews;