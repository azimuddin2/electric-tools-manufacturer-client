import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { RiLuggageCartLine } from 'react-icons/ri';
import { PiUsersThreeDuotone } from "react-icons/pi";
import { BsTools } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';
import Loading from '../../../Shared/Loading/Loading';
import AdminCharts from './AdminCharts';

const AdminHome = () => {
    const { user } = useContext(AuthContext);

    const { data: adminStats = {}, isLoading, error } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/admin-stats', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    });

    const { revenue, customers, tools, orders } = adminStats;

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-gray-50 min-h-screen py-12'>
            <div className='w-11/12 mx-auto'>
                <div className='flex lg:justify-start justify-center'>
                    <h1 className='text-xl lg:text-2xl text-secondary font-medium font-family'>Hi Welcome {user.displayName}! 👋</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 my-6'>
                    <div className='lg:flex items-center justify-center rounded-lg bg-white'>
                        <figure className='lg:ml-8 mt-6 lg:mt-0 text-center'>
                            <GiMoneyStack className='text-6xl inline-block text-primary' />
                        </figure>
                        <div className="card-body pt-2 lg:pt-8">
                            <h2 className="card-title justify-center lg:justify-start text-4xl font-bold text-secondary">
                                $<CountUp end={revenue} duration={5} />
                            </h2>
                            <p className='text-primary text-center lg:text-left text-xl font-family font-medium'>Revenue</p>
                        </div>
                    </div>
                    <div className='lg:flex items-center justify-center rounded-lg bg-white'>
                        <figure className='lg:ml-8 mt-6 lg:mt-0 text-center'>
                            <PiUsersThreeDuotone className='text-6xl inline-block text-primary' />
                        </figure>
                        <div className="card-body pt-2 lg:pt-8">
                            <h2 className="card-title text-secondary justify-center lg:justify-start text-4xl font-bold">
                                <CountUp end={customers} duration={5} />
                            </h2>
                            <p className='text-center text-primary lg:text-left text-xl font-family font-medium'>Customer</p>
                        </div>
                    </div>
                    <div className='lg:flex items-center justify-center rounded-lg bg-white'>
                        <figure className='lg:ml-8 mt-6 lg:mt-0 text-center'>
                            <BsTools className='text-5xl inline-block text-primary' />
                        </figure>
                        <div className="card-body pt-2 lg:pt-8">
                            <h2 className="card-title text-secondary justify-center lg:justify-start text-4xl font-bold">
                                <CountUp end={tools} duration={5} />
                            </h2>
                            <p className='text-center text-primary lg:text-left text-xl font-family font-medium'>Tools</p>
                        </div>
                    </div>
                    <div className='lg:flex items-center justify-center rounded-lg bg-white'>
                        <figure className='lg:ml-8 mt-6 lg:mt-0 text-center'>
                            <RiLuggageCartLine className='text-6xl inline-block text-primary' />
                        </figure>
                        <div className="card-body pt-2 lg:pt-8">
                            <h2 className="card-title text-secondary justify-center lg:justify-start text-4xl font-bold">
                                <CountUp end={orders} duration={5} />
                            </h2>
                            <p className='text-center text-primary lg:text-left text-xl font-family font-medium'>Orders</p>
                        </div>
                    </div>
                </div>
                <div>
                    <AdminCharts></AdminCharts>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;