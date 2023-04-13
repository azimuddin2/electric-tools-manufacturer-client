import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import people4 from '../../../assets/images/people4.png';
import people5 from '../../../assets/images/people5.png';
import people6 from '../../../assets/images/people6.png';
import Testimonial from './Testimonial';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        image: people1,
        name: 'Awlad Hossain',
        location: 'Businessman'
    },
    {
        id: 2,
        image: people2,
        name: 'Miftahul Jannat',
        location: 'India'
    },
    {
        id: 3,
        image: people3,
        name: 'Tahiya Faiza',
        location: 'Bangladesh'
    },
    {
        id: 4,
        image: people4,
        name: 'Jhankar Mahbub',
        location: 'USA'
    },
    {
        id: 5,
        image: people5,
        name: 'Azim Uddin',
        location: 'Bangladesh'
    },
    {
        id: 6,
        image: people6,
        name: 'Munzereen',
        location: 'Businessman'
    },
];

const Testimonials = () => {
    return (
        <section className='mt-20 mb-10 px-6 lg:px-8'>
            <div className='text-center'>
                <p className='text-primary font-semibold text-lg'>Testimonial</p>
                <h1 className='text-3xl lg:text-4xl leading-snug text-secondary'>What Customer Says</h1>
            </div>
            <Swiper
                style={{
                    "--swiper-pagination-color": "#4158f3",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "12px",
                    "--swiper-pagination-bullet-horizontal-gap": "3px",

                    "--swiper-navigation-color": "#fff",
                    "--swiper-navigation-size": "18px",
                    "--swiper-navigation-top-offset": "7%"
                }}
                className="mySwiper"
                breakpoints={{
                    576: {
                        width: 576,
                        slidesPerView: 1,
                    },
                    768: {
                        width: 768,
                        slidesPerView: 1,
                        spaceBetween: 12,
                    },
                    1200: {
                        width: 1200,
                        slidesPerView: 2,
                        spaceBetween: 12,

                    },
                }}
                modules={[A11y, Pagination, Navigation, Autoplay]}
                spaceBetween={8}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{
                    dynamicBullets: true,
                }}
            >
                <div>
                    {
                        testimonials.map(testimonial => <SwiperSlide key={testimonial._id}>
                            <Testimonial testimonial={testimonial}></Testimonial>
                        </SwiperSlide>)
                    }
                </div>
            </Swiper>
        </section>
    );
};

export default Testimonials;