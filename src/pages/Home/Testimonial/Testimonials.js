import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import Testimonial from './Testimonial';
import './Testimonials.css';
import Loading from '../../Shared/Loading/Loading';
import useReview from '../../../hooks/useReview';

const Testimonials = () => {
    const [testimonials, isLoading] = useReview();

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='mt-20 mb-10 px-6 lg:px-8'>
            <div className='text-center'>
                <p className='text-primary font-semibold text-lg'>Testimonial</p>
                <h1 className='text-2xl lg:text-3xl leading-snug text-secondary'>What Customer Says</h1>
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
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
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