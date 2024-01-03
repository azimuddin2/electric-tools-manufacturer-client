import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Loading from '../../Shared/Loading/Loading';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';

const Banner = () => {

    const { data: tools, isLoading, error } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/tools');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    return (
        <div className="max-w-screen-lg lg:mx-auto mx-5 mt-12 lg:mt-20 ">
            <div className="lg:hero-content flex-col lg:flex-row-reverse">
                <Swiper
                    className="mySwiper lg:flex-1"
                    style={{
                        "--swiper-pagination-color": "#4158f3",
                        "--swiper-pagination-bullet-inactive-color": "#999999",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "12px",
                        "--swiper-pagination-bullet-horizontal-gap": "3px"
                    }}
                    modules={[Pagination, Autoplay, A11y]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                >
                    {
                        tools?.map(tool => <SwiperSlide key={tool._id}>
                            <img src={tool.image} alt={tool.name} className='mb-16 mx-auto' />
                        </SwiperSlide>)
                    }
                </Swiper>

                <div className='lg:flex-1 mt-6 lg:mt-0'>
                    <TypeAnimation
                        className="text-3xl lg:text-4xl font-bold text-primary"
                        sequence={[
                            'Modern Power Tools',
                            1000,
                            'Modern Electric Tools',
                            1000,
                        ]}
                        speed={20}
                        repeat={Infinity}
                    />
                    <h1 className="text-xl lg:text-2xl text-secondary mt-4 font-semibold">Hardware Equipments manufacturer</h1>
                    <p className="py-4 md:py-5 text-accent text-sm">Electrical tools are used to do the electrical work like electrical wiring installations by using this tool we can do the tools of electrical wire properly and quickly.</p>
                    <Link to='/tools'>
                        <Button>Get Started <HiArrowRight className='text-lg'></HiArrowRight> </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;