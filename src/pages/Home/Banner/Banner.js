import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import Button from '../../Shared/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Loading from '../../Shared/Loading/Loading';

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
        return <p className='text-red-500 text-center mt-10'>error: {error.message}</p>
    }

    return (
        <div className="mt-14 lg:mt-20 px-6 lg:px-8">
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
                            <img src={tool.img} alt={tool.name} className='mb-16 mx-auto' />
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
                    <h1 className="text-xl text-secondary mt-4 font-semibold">Hardware Equipments & Accessories manufacturer</h1>
                    <p className="py-4 md:py-6 text-secondary text-sm">Electrical tools are used to do the electrical work like electrical wiring installations by using this tool we can do the tools of electrical wire properly and quickly.</p>
                    <Link to='/tools'>
                        <Button>Get Started <HiArrowRight className='ml-1 text-xl'></HiArrowRight> </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;