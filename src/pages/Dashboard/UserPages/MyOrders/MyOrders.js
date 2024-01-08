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
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';

const MyOrders = () => {
    useTitle('My Orders');
    const { user } = useContext(AuthContext);
    const [payment, setPayment] = useState(null);
    const [deleteOrder, setDeleteOrder] = useState(null);

    const url = `http://localhost:5000/orders?email=${user?.email}`;

    const { data: orders, isLoading, error, refetch } = useQuery({
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

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='bg-gray-50 h-screen lg:h-full py-16'>
            {
                orders?.length > 0 ?
                    <div className='bg-white w-11/12 lg:w-4/5 mx-auto p-5 lg:p-10'>
                        <h1 className='text-2xl font-medium mb-4'>My Orders</h1>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className='bg-gray-100 font-bold uppercase'>
                                    <tr>
                                        <th>No</th>
                                        <th>Name & Email</th>
                                        <th>Phone</th>
                                        <th>Tool Name</th>
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
                    <div className='text-center w-11/12 mx-auto'>
                        <img src={orderGif} alt="Order Gif" className='mx-auto rounded-2xl mb-4' />
                        <Link to='/tools'>
                            <button className='btn btn-sm btn-primary text-white lg:mt-0'>Please Order tools <HiArrowRight className='text-lg'></HiArrowRight> </button>
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
            }
        </section>
    );
};

export default MyOrders;