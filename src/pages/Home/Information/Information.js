import React from 'react';
import quality from '../../../assets/images/quality.png';
import shipping from '../../../assets/images/shipping.png';
import support from '../../../assets/images/support.png';
import { Fade } from 'react-reveal';

const Information = () => {
    return (
        <section className='max-w-screen-lg lg:mx-auto mx-5 my-12 lg:my-16'>
            <div className='mb-10'>
                <h1 className='text-center font-semibold text-primary text-lg'>Teams Support</h1>
                <h1 className='text-center text-2xl lg:text-3xl text-secondary font-normal'>Why Customer Choose Us?</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <Fade top>
                    <div className="card card-side shadow px-6 py-8 items-center">
                        <figure>
                            <img src={quality} alt="Quality" />
                        </figure>
                        <div className="card-body p-0 pl-5">
                            <h2 className="card-title">Best Quality</h2>
                            <p>Best quality is products</p>
                        </div>
                    </div>
                </Fade>
                <Fade bottom>
                    <div className="card card-side shadow px-6 py-8 items-center">
                        <figure>
                            <img src={shipping} alt="Delivary" />
                        </figure>
                        <div className="card-body p-0 pl-5">
                            <h2 className="card-title">Shipping</h2>
                            <p>Deliver within 24 hours</p>
                        </div>
                    </div>
                </Fade>
                <Fade top>
                    <div className="card card-side shadow px-6 py-8 items-center">
                        <figure>
                            <img src={support} alt="Support" />
                        </figure>
                        <div className="card-body p-0 pl-5">
                            <h2 className="card-title">Support 24/7</h2>
                            <p>Contact us 24 hours a day</p>
                        </div>
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default Information;