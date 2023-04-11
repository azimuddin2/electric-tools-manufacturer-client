import React from 'react';
import Banner from '../Banner/Banner';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import Tools from '../Tools/Tools';
import BusinessOverview from '../BusinessOverview/BusinessOverview';

const Home = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Banner></Banner>
            <CompanyLogo></CompanyLogo>
            <Tools></Tools>
            <BusinessOverview></BusinessOverview>
        </div>
    );
};

export default Home;