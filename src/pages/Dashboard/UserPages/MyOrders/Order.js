import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsFillInfoSquareFill } from "react-icons/bs";

const Order = ({ order, index, setPayment, setDeleteOrder, setPaymentInformationModal }) => {

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
            <td className='text-secondary font-semibold'>${totalToolPrice}</td>
            <td>
                {
                    paid === true ?
                        (
                            <>
                                <h4 className='text-green-500 font-medium'>Paid</h4>
                                <p className='text-sm'>{transactionId}</p>
                            </>
                        )
                        :
                        (
                            <label
                                onClick={() => setPayment(order)}
                                htmlFor="payment-modal"
                                className="btn btn-sm capitalize btn-primary text-white font-medium bg-primary rounded-sm"
                            >
                                Pay
                            </label>
                        )
                }
            </td>
            <td>
                {
                    paid === true ?
                        (
                            <label
                                onClick={() => setPaymentInformationModal(order)}
                                htmlFor="payment-information-modal"
                                className="tooltip tooltip-top"
                                data-tip="Payment Information"
                            >
                                <BsFillInfoSquareFill className='text-2xl text-primary cursor-pointer' />
                            </label>
                        )
                        :
                        (
                            <label
                                onClick={() => setDeleteOrder(order)}
                                htmlFor="confirmation-modal"
                                className="tooltip tooltip-top"
                                data-tip="Delete"
                            >
                                <RiDeleteBin5Fill className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Fill>
                            </label>
                        )
                }
            </td>
        </tr>
    );
};

export default Order;