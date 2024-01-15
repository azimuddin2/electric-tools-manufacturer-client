import React from 'react';

const PaymentRow = ({ index, payment }) => {
    const { customerName, customerEmail, date, toolName, totalToolPrice, transactionId } = payment;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                {customerName}
                <br />
                <span className="badge badge-ghost badge-sm">{customerEmail}</span>
            </td>
            <td>{date}</td>
            <td>{toolName}</td>
            <td className='text-secondary font-semibold'>${totalToolPrice}</td>
            <td>{transactionId}</td>
        </tr>
    );
};

export default PaymentRow;