import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";

const AddReview = () => {

    const [value, setValue] = useState([]); // initial rating value
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: value,
        color: "#ff9800",
        activeColor: "#dadada",
        onChange: newValue => {
            setValue(newValue);
        }
    };

    const handleReview = data => {
        const reviewData = { ...data, rating: value };
        console.log(reviewData);
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(inserted => {
                console.log('inserted : ', inserted);
                if (inserted.insertedId) {
                    toast.success('review added successfully');
                    reset();
                } else {
                    toast.error("Failed to add review");
                }
            })
    };

    return (
        <div>
            <div className="hero-content flex-col lg:flex-col-reverse">
                <div className="card shadow-xl">
                    <div className="card-body w-96">
                        <div>
                            <h2 className='text-2xl text-center'>Add a Review</h2>
                        </div>
                        <form onSubmit={handleSubmit(handleReview)}>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    type="email"
                                    value={user?.email}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a vilid Email'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    type="text"
                                    value={user?.displayName}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Product Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <textarea
                                    placeholder='Product Description'
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: 'description is Required'
                                        },
                                        pattern: {
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                    {errors.description?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                </label>
                            </div>

                            <p>Please Rating :</p>
                            <div className='flex justify-center items-center '>
                                <ReactStars {...thirdExample} />
                            </div>
                            {/* {signInError} */}
                            <input className=' btn  w-full max-w-xs' type="submit" value="Save" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;