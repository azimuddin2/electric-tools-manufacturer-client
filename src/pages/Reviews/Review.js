import React from 'react';
import quote from '../../assets/icons/quote.svg';
import ReactStars from "react-rating-stars-component";
import Fade from 'react-reveal/Fade';

const Review = ({ review }) => {
    const { name, image, country, description, rating } = review;

    const thirdExample = {
        size: 26,
        count: 5,
        isHalf: true,
        color: "#ff9800",
        activeColor: "#dadada",
    };

    return (
        <Fade bottom>
            <div className="card p-7 shadow">
                <div className='flex items-center justify-between'>
                    <div className='md:flex items-center'>
                        {
                            image === null ?
                                <div className="avatar placeholder">
                                    <div className="bg-secondary text-white rounded-full w-12 ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <span className="text-3xl">{name.slice(0, 1)}</span>
                                    </div>
                                </div>
                                :
                                <div className="avatar">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={image} alt={name} />
                                    </div>
                                </div>
                        }
                        <div className='ml-5 mt-2 lg:mt-0'>
                            <h2 className='text-base lg:text-xl font-bold text-neutral'>{name}</h2>
                            <p className='font-semibold text-accent'>{country}</p>
                        </div>
                    </div>
                    <figure>
                        <img src={quote} alt="Shoes" className='w-12' />
                    </figure>
                </div>
                <div className="mt-4">
                    <p className='text-sm text-accent capitalize leading-6'>{description}</p>
                    <p><ReactStars value={rating} {...thirdExample} /></p>
                </div>
            </div>
        </Fade>
    );
};

export default Review;