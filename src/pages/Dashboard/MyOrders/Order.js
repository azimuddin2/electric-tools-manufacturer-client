import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order, index }) => {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{order.toolName}</td>
            <td>{order.orderQuantity}</td>
            <td>${order.toolPrice}</td>
            <td>
                {(order.toolPrice && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                {(order.toolPrice && order.paid) && <div>
                    <p><span className='text-success'>Paid</span> </p>
                    <p>Transaction id: <span className='text-success'>{order.transactionId}</span> </p>
                </div>}

            </td>

        </tr>
    );
};

export default Order;