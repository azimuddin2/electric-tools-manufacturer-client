import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ProductRow = ({ tool, index, setDeletingProduct, setUpdateProduct }) => {
    const { name, img, price, description, minimumQuantity, availableQuantity } = tool;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <img src={img} alt={name} className='w-20'/>
            </td>
            <td>{name}</td>
            <td>${price}</td>
            <td title={description}>
                {
                    description.length > 18 ?
                        <>{description.slice(0, 18) + '...'}</>
                        :
                        <>{description}</>
                }
            </td>
            <td>{minimumQuantity}</td>
            <td>{availableQuantity}</td>
            <td>
                <div className=' flex justify-between items-center'>
                    <label
                        onClick={() => setUpdateProduct(tool)}
                        htmlFor="update-product-modal"
                        title='Edit'
                    >
                        <BiEdit className='text-2xl text-green-500 mr-3 cursor-pointer'></BiEdit>
                    </label>

                    <label
                        onClick={() => setDeletingProduct(tool)}
                        htmlFor="confirmation-modal"
                        title='Delete'
                    >
                        <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                    </label>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;