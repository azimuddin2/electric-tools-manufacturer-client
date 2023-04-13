import React from 'react';
import quote from '../../../assets/icons/quote.svg';

const Testimonial = ({testimonial}) => {
    const {name, image, location} = testimonial;

    return (
        <div className="card p-6 border md:ml-2 md:mr-2 lg:ml-2 lg:mr-2 mb-14 mt-20">
            <div className='flex items-center justify-between'>
                <div className='md:flex items-center'>
                    <div className="avatar">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div className='ml-5'>
                        <h2 className='text-base lg:text-xl font-bold text-neutral'>{name}</h2>
                        <p className='font-semibold text-accent'>{location}</p>
                    </div>
                </div>
                <figure>
                    <img src={quote} alt="Shoes" className='w-12' />
                </figure>
            </div>
            <div className="mt-4">
                <p className='text-sm text-accent capitalize leading-6'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, words which don't look even slightly believable. </p>
                <div className="rating mt-3">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary w-4 mr-1" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary w-4 mr-1" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary w-4 mr-1" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary w-4 mr-1" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary w-4 mr-1" />
                </div>
            </div>
        </div>
    );
};

export default Testimonial;