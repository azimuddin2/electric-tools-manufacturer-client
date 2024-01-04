import React, { useState } from 'react';
import backgroundImg from '../../../assets/images/background.jpg';
import { FaTools, FaUsers } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import like from '../../../assets/images/like.png';
import { Fade } from 'react-reveal';

const BusinessOverview = () => {
    const [counter, setCounter] = useState(false);

    return (
        <section
            className='max-w-screen-xl lg:mx-auto my-16 bg-fixed'
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%'
            }}
        >
            <div className='bg-black bg-opacity-60 py-16 lg:py-20'>
                <div className='max-w-screen-lg lg:mx-auto mx-5'>
                    <div className='mb-12'>
                        <h1 className='text-center text-primary uppercase text-4xl font-semibold mb-3 lg:mb-1'>Millions of Clients trust us</h1>
                        <h3 className='text-center capitalize text-white text-2xl'>try to understand Customer expectation</h3>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <Fade top>
                            <div className="stats shadow">
                                <div className="stat text-center py-6">
                                    <FaTools className='text-primary text-6xl mb-2 mx-auto' />
                                    <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                                        <h2 className="stat-value">
                                            {counter && <CountUp start={1} end={100} duration={2} delay={0}></CountUp>}
                                            k
                                        </h2>
                                    </ScrollTrigger>
                                    <h3 className="text-lg text-primary font-medium">Tools</h3>
                                </div>
                            </div>
                        </Fade>
                        <Fade bottom>
                            <div className="stats shadow">
                                <div className="stat text-center py-6">
                                    <AiFillDollarCircle className='text-primary text-6xl mb-2 mx-auto' />
                                    <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                                        <h2 className="stat-value">
                                            {counter && <CountUp start={1} end={200} duration={2} delay={0}></CountUp>}
                                            M
                                        </h2>
                                    </ScrollTrigger>
                                    <h3 className="text-lg text-primary font-medium">Annual Revenue</h3>
                                </div>
                            </div>
                        </Fade>
                        <Fade top>
                            <div className="stats shadow">
                                <div className="stat text-center py-6">
                                    <FaUsers className='text-primary text-6xl mb-2 mx-auto' />
                                    <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
                                        <h2 className="stat-value">
                                            {counter && <CountUp start={1} end={120} duration={2} delay={0}></CountUp>}
                                            k
                                        </h2>
                                    </ScrollTrigger>
                                    <h3 className="text-lg text-primary font-medium"> Customers</h3>
                                </div>
                            </div>
                        </Fade>
                        <Fade bottom>
                            <div className="stats shadow">
                                <div className="stat text-center py-6">
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
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessOverview;