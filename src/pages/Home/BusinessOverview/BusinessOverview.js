import React, { useState } from 'react';
import backgroundImg from '../../../assets/images/background.jpg';
import { FaTools, FaUsers } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import like from '../../../assets/images/like.png';

const BusinessOverview = () => {
    const [counter, setCounter] = useState(false);

    return (
        <section style={{
            background: `url(${backgroundImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100%',
            backgroundSize: 'cover',
            width: '100%'
        }}
            className=' px-6 lg:px-8 py-12'
        >
            <div className='mb-12'>
                <h1 className='text-center text-primary uppercase text-4xl font-semibold'>Millions of Clients trust us</h1>
                <h3 className='text-center capitalize text-white text-2xl'>try to understand Customer expectation</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className="stats shadow">
                    <div className="stat text-center">
                        <FaTools className='text-primary text-6xl mb-2 mx-auto'></FaTools>
                        <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                            <h2 className="stat-value">
                                {counter && <CountUp start={1} end={100} duration={2} delay={0}></CountUp>}
                                k
                            </h2>
                        </ScrollTrigger>
                        <h3 className="text-lg text-primary font-medium">Tools</h3>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat text-center">
                        <AiFillDollarCircle className='text-primary text-6xl mb-2 mx-auto'></AiFillDollarCircle>
                        <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                            <h2 className="stat-value">
                                {counter && <CountUp start={1} end={200} duration={2} delay={0}></CountUp>}
                                M
                            </h2>
                        </ScrollTrigger>
                        <h3 className="text-lg text-primary font-medium">Annual Revenue</h3>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat text-center">
                        <FaUsers className='text-primary text-6xl mb-2 mx-auto'></FaUsers>
                        <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                            <h2 className="stat-value">
                                {counter && <CountUp start={1} end={120} duration={2} delay={0}></CountUp>}
                                k
                            </h2>
                        </ScrollTrigger>
                        <h3 className="text-lg text-primary font-medium"> Customers</h3>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat text-center">
                        <img src={like} alt="Like" className='mb-2 mx-auto' />
                        <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                            <h2 className="stat-value">
                                {counter && <CountUp start={1} end={44} duration={2} delay={0}></CountUp>}
                                k
                            </h2>
                        </ScrollTrigger>
                        <h3 className="text-lg text-primary font-medium">Feedbacks</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessOverview;