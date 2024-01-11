import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import StarRatings from 'react-star-ratings';

const ProductRow = ({ tool, index, setDeletingProduct, setUpdateProduct }) => {
    const { name, image, price, description, minimumQuantity, availableQuantity, rating } = tool;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <img src={image} alt={name} />
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
            <td>{minimumQuantity} OrderQuantity</td>
            <td>{availableQuantity} OrderQuantity</td>
            <td>
                <StarRatings
                    rating={rating}
                    starRatedColor="#ff9800"
                    name="rating"
                    starSpacing="0px"
                    starDimension="20px"
                />
            </td>
            <td>
                <div className=' flex justify-between items-center'>
                    <label
                        onClick={() => setUpdateProduct(tool)}
                        htmlFor="update-product-modal"
                        title='Edit'
                    >
                        <BiEdit className='text-2xl text-primary mr-3 cursor-pointer'></BiEdit>
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