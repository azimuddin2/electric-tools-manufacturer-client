import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Order = ({ order, index }) => {
    const { customerName, customerEmail, customerPhone, toolName, toolPrice, orderQuantity } = order;
    const totalToolPrice = toolPrice * orderQuantity;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                {customerName}
                <br />
                <span className="badge badge-ghost badge-sm">{customerEmail}</span>
            </td>
            <td>{customerPhone}</td>
            <td>{toolName}</td>
            <td>{toolPrice} × {orderQuantity}</td>
            <td>${totalToolPrice}</td>
            <td>
                {(toolPrice && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-sm btn-primary'>Pay</button></Link>}
                {(toolPrice && order.paid) && <div>
                    <p><span className='text-success'>Paid</span> </p>
                    <p>Transaction id: <span className='text-success'>{order.transactionId}</span> </p>
                </div>}
            </td>
            <td>
                <label
                    // onClick={() => setDeletingProduct(tool)}
                    htmlFor="confirmation-modal"
                    title='Delete'
                >
                    <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                </label>
            </td>
        </tr>
    );
};

export default Order;