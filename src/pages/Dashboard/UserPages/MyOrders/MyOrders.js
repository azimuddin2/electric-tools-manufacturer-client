import React from 'react';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Order from './Order';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useTitle from '../../../../hooks/useTitle';
import Loading from '../../../Shared/Loading/Loading';
import PaymentModal from '../PaymentModal/PaymentModal';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import orderGif from '../../../../assets/images/order.gif';

const MyOrders = () => {
    useTitle('My Orders');
    const { user } = useContext(AuthContext);
    const [payment, setPayment] = useState(null);
    const [deleteOrder, setDeleteOrder] = useState(null);

    const url = `http://localhost:5000/orders?email=${user?.email}`;

    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(url, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleDeleteOrder = (order) => {
        fetch(`http://localhost:5000/order/${order._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    refetch();
                    toast.success(`Order ${order?.toolName} tool deleted successfully`);
                }
            })
    }

    const closeModal = () => {
        setDeleteOrder(null);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='bg-gray-50 h-screen'>
            {/* {
                orders?.length > 0 ?
                    <div className='h-full p-4 lg:p-10'>
                        <h1 className='text-2xl font-medium mb-5'>My Orders</h1>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name & Email</th>
                                        <th>Phone</th>
                                        <th>Tools</th>
                                        <th>Total Price</th>
                                        <th>Payment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.map((order, index) => <Order
                                            key={order._id}
                                            order={order}
                                            index={index}
                                            setPayment={setPayment}
                                            setDeleteOrder={setDeleteOrder}
                                        ></Order>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className='text-center m-4 lg:m-0'>
                        <img src={orderGif} alt="Order Gif" className='mx-auto mt-10' />
                        <Link to='/tools'>
                            <button className='btn btn-sm btn-primary mt-4 lg:mt-0'>Please Order tools <HiArrowRight className='ml-1 text-lg'></HiArrowRight> </button>
                        </Link>
                    </div>
            }
            {
                payment && <PaymentModal
                    payment={payment}
                    setPayment={setPayment}
                    refetch={refetch}
                ></PaymentModal>
            }
            {
                deleteOrder && <ConfirmationModal
                    modalData={deleteOrder}
                    closeModal={closeModal}
                    successModal={handleDeleteOrder}
                ></ConfirmationModal>
            } */}
        </section>
    );
};

export default MyOrders;