import React from 'react';

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
            <td>{orderQuantity}</td>
            <td>${totalToolPrice}</td>
            {/* <td>
                {(toolPrice && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                {(toolPrice && order.paid) && <div>
                    <p><span className='text-success'>Paid</span> </p>
                    <p>Transaction id: <span className='text-success'>{order.transactionId}</span> </p>
                </div>}

            </td> */}
        </tr>
    );
};

export default Order;