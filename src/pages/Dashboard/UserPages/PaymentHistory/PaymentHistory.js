import React, { useContext } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useTitle from '../../../../hooks/useTitle';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';
import Loading from '../../../Shared/Loading/Loading';
import orderGif from '../../../../assets/images/order.gif';
import PaymentRow from './PaymentRow';

const PaymentHistory = () => {
    useTitle('Payment History');
    const { user } = useContext(AuthContext);

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/payments?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            } catch (error) {

            }
        }
    })

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            {
                payments?.length > 0 ?
                    (
                        <div className='bg-white w-11/12 mx-auto p-5 lg:p-10'>
                            <h1 className='text-2xl font-medium mb-4'>Payment History: 0{payments.length}</h1>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className='bg-gray-100 font-bold uppercase'>
                                        <tr>
                                            <th>No</th>
                                            <th>Name & Email</th>
                                            <th>Date & Time</th>
                                            <th>Tool Name</th>
                                            <th>Total Price</th>
                                            <th>TransactionId</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            payments?.map((payment, index) => <PaymentRow
                                                key={payment._id}
                                                index={index}
                                                payment={payment}
                                            >
                                            </PaymentRow>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='text-center w-11/12 mx-auto'>
                            <img src={orderGif} alt="Order Gif" className='mx-auto rounded-2xl mb-4' />
                            <Link to='/dashboard/my-orders'>
                                <button className='btn btn-sm btn-primary text-white lg:mt-0'>Please Payment<HiArrowRight className='text-lg'></HiArrowRight> </button>
                            </Link>
                        </div>
                    )
            }
        </section>
    );
};

export default PaymentHistory;