import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Order from './Order';
import orderGif from '../../../assets/images/order.gif';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    useTitle('My Orders');
    const { user } = useContext(AuthContext);
    // const [payment, setPayment] = useState(null);

    const url = `http://localhost:5000/orders?email=${user?.email}`;

    const { data: orders, isLoading } = useQuery({
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
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            {
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
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.map((order, index) => <Order
                                            key={order._id}
                                            order={order}
                                            index={index}
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
                            <button className='btn btn-primary mt-4 lg:mt-0'>Please Order tools</button>
                        </Link>
                    </div>
            }
        </section>
    );
};

export default MyOrders;