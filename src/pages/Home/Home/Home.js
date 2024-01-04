import React from 'react';
import Banner from '../Banner/Banner';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import Tools from '../Tools/Tools';
import BusinessOverview from '../BusinessOverview/BusinessOverview';
import Contact from '../Contact/Contact';
import Testimonials from '../Testimonial/Testimonials';
import Information from '../Information/Information';
import useTitle from '../../../hooks/useTitle';

const Home = () => {
    useTitle('Home');
    return (
        <div>
            <Banner></Banner>
            <CompanyLogo></CompanyLogo>
            <Tools></Tools>
            <BusinessOverview></BusinessOverview>
            <Information></Information>
            <Contact></Contact>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;