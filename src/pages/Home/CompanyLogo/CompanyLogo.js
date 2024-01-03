import React from 'react';
import alibaba from '../../../assets/icons/Alibaba.svg';
import amazon from '../../../assets/icons/Amazon.svg';
import daraz from '../../../assets/icons/Daraz.pk Logo.svg';
import ebay from '../../../assets/icons/Ebay.svg';
import rakuten from '../../../assets/icons/Rakuten.svg';
import walmart from '../../../assets/icons/Walmart.svg';
import Fade from 'react-reveal/Fade';

const CompanyLogo = () => {
    return (
        <div className='max-w-screen-lg lg:mx-auto mx-5 py-12 lg:py-20'>
            <div className='logo-container grid grid-cols-3 lg:grid-cols-6 gap-6 lg:px-12'>
                <Fade top><img src={alibaba} alt="alibaba" /></Fade>
                <Fade bottom><img src={amazon} alt="amazon" /></Fade>
                <Fade top><img src={daraz} alt="daraz" /></Fade>
                <Fade bottom><img src={ebay} alt="ebay" /></Fade>
                <Fade top><img src={rakuten} alt="rakuten" /></Fade>
                <Fade bottom><img src={walmart} alt="walmart" /></Fade>
            </div>
        </div>
    );
};

export default CompanyLogo;