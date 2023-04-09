import React from 'react';
import backgroundImg from '../../../assets/images/background.jpg';
import { FaTools, FaUsers } from 'react-icons/fa';
import { AiTwotoneLike, AiFillDollarCircle } from 'react-icons/ai';
// import './BusinessOverview.css';

const BusinessOverview = () => {
    return (
        <section style={{
            background: `url(${backgroundImg})`,
            backgroundRepeat: '100%',
            backgroundPosition: '100%'
        }}
            className='px-8 py-12 background-image'
        >
            <div>
                <h1 className='text-center text-cyan-500 uppercase text-4xl font-bold'>Millions of Clients trust us</h1>
                <h3 className='text-center capitalize text-white text-2xl mb-12'>try to understand Customer expectation</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className="stats shadow">
                    <div className="stat text-center">
                        <FaTools className='text-primary text-6xl mb-2 mx-auto'></FaTools>
                        <h2 className="stat-value">200k</h2>
                        <h3 className="text-lg text-primary font-medium">Tools</h3>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat text-center">
                        <AiFillDollarCircle className='text-primary text-6xl mb-2 mx-auto'></AiFillDollarCircle>
                        <h2 className="stat-value">200M</h2>
                        <h3 className="text-lg text-primary font-medium">Annual Revenue</h3>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat text-center">
                        <FaUsers className='text-primary text-6xl mb-2 mx-auto'></FaUsers>
                        <h2 className="stat-value">120k</h2>
                        <h3 className="text-lg text-primary font-medium"> Customers</h3>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat text-center">
                        <AiTwotoneLike className='text-primary text-6xl mb-2 mx-auto'></AiTwotoneLike>
                        <h2 className="stat-value">44k</h2>
                        <h3 className="text-lg text-primary font-medium">Feedbacks</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessOverview;