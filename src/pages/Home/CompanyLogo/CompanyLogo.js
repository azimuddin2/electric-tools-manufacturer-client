import React from 'react';
import alibaba from '../../../assets/icons/Alibaba.svg';
import amazon from '../../../assets/icons/Amazon.svg';
import daraz from '../../../assets/icons/Daraz.pk Logo.svg';
import ebay from '../../../assets/icons/Ebay.svg';
import rakuten from '../../../assets/icons/Rakuten.svg';
import walmart from '../../../assets/icons/Walmart.svg';

const CompanyLogo = () => {
    return (
        <div className='px-8 mx-auto container'>
            <div className='logo-container grid grid-cols-6 px-10 py-20'>
                <img src={alibaba} alt="" />
                <img src={amazon} alt="" />
                <img src={daraz} alt="" />
                <img src={ebay} alt="" />
                <img src={rakuten} alt="" />
                <img src={walmart} alt="" />
            </div>
        </div>
    );
};

export default CompanyLogo;