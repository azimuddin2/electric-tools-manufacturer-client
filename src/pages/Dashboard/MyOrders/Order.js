import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FcPrint } from 'react-icons/fc';

const Order = ({ order, index, setPayment, setDeleteOrder }) => {
    const { customerName, customerEmail, customerPhone, toolName, toolPrice, orderQuantity, paid, transactionId } = order;
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
            <td>${totalToolPrice}</td>
            <td>
                {
                    paid ?
                        <>
                            <h4 className='text-green-500 font-medium'>Paid</h4>
                            <p className='text-sm'>{transactionId}</p>
                        </>
                        :
                        <label
                            onClick={() => setPayment(order)}
                            htmlFor="payment-modal"
                            className="btn btn-sm capitalize btn-primary text-white font-medium bg-primary"
                        >
                            Pay
                        </label>
                }
            </td>
            <td>
                {
                    paid ?
                        <div className="tooltip tooltip-top print:hidden" data-tip="Print">
                            <FcPrint
                                onClick={() => window.print()}
                                className='text-3xl cursor-pointer print:hidden'
                            ></FcPrint>
                        </div>
                        :
                        <label
                            onClick={() => setDeleteOrder(order)}
                            htmlFor="confirmation-modal"
                            title='Delete'
                        >
                            <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                        </label>
                }
            </td>
        </tr>
    );
};

export default Order;