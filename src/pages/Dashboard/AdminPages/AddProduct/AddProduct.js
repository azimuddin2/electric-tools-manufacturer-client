import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useTitle from '../../../../hooks/useTitle';
import { MdErrorOutline } from 'react-icons/md';
import StarRatings from 'react-star-ratings';

const AddProduct = () => {
    useTitle('Add Product');
    const [accepted, setAccepted] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [rating, setRating] = useState(2);

    const changeRating = (newRating) => {
        setRating(newRating);
    };

    const onSubmit = async data => {

        fetch('http://localhost:5000/tool', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Product added successfully');
                    reset();
                }
                else {
                    toast.error('Failed to add the Product')
                }
            })
    };

    return (
        <section className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            <h1 className='text-2xl font-medium mb-5 lg:ml-28 text-center lg:text-left'>Add a New Product</h1>

            <div className='bg-white shadow w-11/12 lg:w-4/5 mx-auto p-5 lg:p-10 rounded-lg'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4'
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Product Name*</span>
                        </label>
                        <input
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Product name is required'
                                }
                            })}
                            type="text"
                            placeholder='Type here'
                            className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.name.message}</span>}
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Image URL*</span>
                        </label>
                        <input
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image url is required'
                                }
                            })}
                            type='text'
                            placeholder='Type here'
                            className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.image.message}</span>}
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Minimum Quantity*</span>
                        </label>
                        <input
                            {...register("minimumQuantity", {
                                required: {
                                    value: true,
                                    message: 'Minimum quantity is required'
                                },
                                min: {
                                    value: 6,
                                    message: 'Minimum quantity 6'
                                },
                            })}
                            type="number"
                            placeholder='Type here'
                            className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.minimumQuantity?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.minimumQuantity.message}</span>}
                            {errors.minimumQuantity?.type === 'min' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.minimumQuantity.message}</span>}
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Available Quantity*</span>
                        </label>
                        <input
                            {...register("availableQuantity", {
                                required: {
                                    value: true,
                                    message: 'Available quantity is required'
                                },
                                max: {
                                    value: 100,
                                    message: 'Available Quantity 100'
                                }
                            })}
                            type='number'
                            placeholder='Type here'
                            className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.availableQuantity.message}</span>}
                            {errors.availableQuantity?.type === 'max' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.availableQuantity.message}</span>}
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Price*</span>
                        </label>
                        <input
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'Price is required'
                                }
                            })}
                            type="number"
                            placeholder='Type here'
                            className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.price.message}</span>}
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Description*</span>
                        </label>
                        <textarea
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is required'
                                }
                            })}
                            cols="30"
                            rows="3"
                            name="description"
                            placeholder='Type here product description...'
                            className="textarea textarea-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        ></textarea>
                        <label className="label">
                            {errors.description?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.description.message}</span>}
                        </label>
                    </div>

                    <div className="form-control lg:mt-[-40px]">
                        <h2 className='font-medium'>Product Rating*</h2>
                        <div className='text-center'>
                            <StarRatings
                                rating={rating}
                                starRatedColor="#F2871D"
                                name="rating"
                                starSpacing="1px"
                                changeRating={changeRating}
                                starDimension="34px"
                                starHoverColor="#F2871D"
                            />
                        </div>
                        <label className="label flex justify-start items-center mt-3">
                            <input
                                onClick={() => setAccepted(!accepted)}
                                type="checkbox"
                                className="checkbox checkbox-primary" />
                            <span className="label-text ml-3 text-secondary font-semibold text-lg">Remember me</span>
                        </label>
                    </div>

                    <input
                        disabled={!accepted}
                        className='btn btn-primary text-white w-full uppercase mt-2 lg:mt-5'
                        type="submit"
                        value="Save"
                    />

                </form>

            </div>

        </section>
    );
};

export default AddProduct;