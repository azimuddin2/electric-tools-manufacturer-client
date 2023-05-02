import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Order from './Order';

const MyOrders = () => {
    useTitle('My Orders');
    const { user } = useContext(AuthContext);
    // const [payment, setPayment] = useState(null);

    const url = `http://localhost:5000/orders?customerEmail=${user?.email}`;

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
    console.log(orders)
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            {
                orders?.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, index) => <Order
                                        key={order._id}
                                        index={index}
                                    ></Order>)
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <h1>no order</h1>
            }
        </section>
    );
};

export default MyOrders;