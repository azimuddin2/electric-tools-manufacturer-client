import React from 'react';
import electricToolsImg from '../../../assets/images/banner.jpg';
import Button from '../../Shared/Button/Button';

const Banner = () => {
    return (
        <div className="hero min-h-full p-8">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div>
                    <img src={electricToolsImg} className="w-100 rounded-lg" alt='' />
                </div>
                <div>
                    <h1 className="text-5xl font-bold text-primary">Modern Power Tools</h1>
                    <h1 className="text-2xl mt-4 font-bold">Hardware Equipments & Accessories manufacturer</h1>
                    <p className="py-6">Electrical tools are used to do the electrical work like electrical wiring installations by using this tool we can do the tools of electrical wire properly and quickly.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;