import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import ReactStars from "react-rating-stars-component";

const ClientReviewRow = ({ index, review, setDeletingReview }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const { name, email, image, description, rating } = review;

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const thirdExample = {
        size: 24,
        count: 5,
        isHalf: true,
        color: "#ff9800",
        activeColor: "#dadada",
    };

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                {
                    image === null ?
                        <div className="avatar placeholder">
                            <div className="bg-secondary text-white rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <span className="text-3xl">{name.slice(0, 1)}</span>
                            </div>
                        </div>
                        :
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={image} alt={name} />
                            </div>
                        </div>
                }
            </td>
            <td>
                {name}
                <br />
                <span className="badge badge-ghost badge-sm">{email}</span>
            </td>
            <td>
                {isReadMore ? description.slice(0, 40) + '...' : description}
                <p onClick={toggleReadMore} className='inline'>
                    {
                        isReadMore ?
                            <span className='link font-semibold text-primary'>Read More</span>
                            :
                            <span className='link font-semibold text-primary'>Show Less</span>
                    }
                </p>
            </td>
            <td>
                <ReactStars value={rating} {...thirdExample} />
            </td>
            <td>
                <label
                    onClick={() => setDeletingReview(review)}
                    htmlFor="confirmation-modal"
                    className='tooltip tooltip-top'
                    data-tip="Delete"
                >
                    <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                </label>
            </td>
        </tr>
    );
};

export default ClientReviewRow;