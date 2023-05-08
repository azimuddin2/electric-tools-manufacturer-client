import React from 'react';

const ProductRow = ({ tool, index, refetch, setDeletingProduct }) => {
    const { _id, name, img, price, minimumQuantity, availableQuantity } = tool;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="w-20 bg-gray-400 rounded-sm">
                        <img src={img} alt={name} />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>${price}</td>
            {/* <td>{description}</td> */}
            <td>
                <label onClick={() => setDeletingProduct(tool)} htmlFor="delete-confirm-modal" className="btn btn-error btn-sm text-white">Delete</label>
            </td>
        </tr>
    );
};

export default ProductRow;