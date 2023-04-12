import React from 'react';
import alibaba from '../../../assets/icons/Alibaba.svg';
import amazon from '../../../assets/icons/Amazon.svg';
import daraz from '../../../assets/icons/Daraz.pk Logo.svg';
import ebay from '../../../assets/icons/Ebay.svg';
import rakuten from '../../../assets/icons/Rakuten.svg';
import walmart from '../../../assets/icons/Walmart.svg';

const CompanyLogo = () => {
    return (
        <div className='px-6 lg:px-8 py-16 lg:py-20'>
            <div className='logo-container grid grid-cols-3 lg:grid-cols-6 gap-6 lg:px-20'>
                <img src={alibaba} alt="alibaba" />
                <img src={amazon} alt="amazon" />
                <img src={daraz} alt="daraz" />
                <img src={ebay} alt="ebay" />
                <img src={rakuten} alt="rakuten" />
                <img src={walmart} alt="walmart" />
            </div>
        </div>
    );
};

export default CompanyLogo;