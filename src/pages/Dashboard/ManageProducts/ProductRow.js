import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ProductRow = ({ tool, index, setDeletingProduct }) => {
    const { name, img, price, description, minimumQuantity, availableQuantity } = tool;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <img src={img} alt={name} />
            </td>
            <td>{name}</td>
            <td>${price}</td>
            <td title={description}>
                {
                    description.length > 20 ?
                        <>{description.slice(0, 20) + '...'}</>
                        :
                        <>{description}</>
                }
            </td>
            <td>{minimumQuantity}</td>
            <td>{availableQuantity}</td>
            <td>
                <label
                    onClick={() => setDeletingProduct(tool)}
                    htmlFor="confirmation-modal"
                >
                    <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                </label>
            </td>
        </tr>
    );
};

export default ProductRow;