import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useTitle from '../../../hooks/useTitle';

const AddProduct = () => {
    useTitle('Add Product');
    const [accepted, setAccepted] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
        <section className='h-full p-4 lg:p-10'>
            <h1 className='text-2xl font-medium mb-5 lg:ml-28'>Add a New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='card shadow-xl border grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 p-4 lg:p-8 lg:w-4/5 mx-auto'>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Product name is required '
                                }
                            })}
                            type="text"
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Available Quantity</span>
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
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}
                            {errors.availableQuantity?.type === 'max' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Minimum Quantity</span>
                        </label>
                        <input
                            {...register("minimumQuantity", {
                                required: {
                                    value: true,
                                    message: 'Minimum quantity is required'
                                },
                                min: {
                                    value: 5,
                                    message: 'Minimum quantity 5'
                                },
                            }
                            )}
                            type="number"
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.minimumQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minimumQuantity.message}</span>}
                            {errors.minimumQuantity?.type === 'min' && <span className="label-text-alt text-red-500">{errors.minimumQuantity.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            {...register("img", {
                                required: {
                                    value: true,
                                    message: 'Image url is required'
                                }
                            })}
                            type='text'
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.img?.type === 'required' && <span className="label-text-alt text-red-500">{errors.img.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'Price is required'
                                }
                            })}
                            type="number"
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is required'
                                }
                            })}
                            name="description"
                            className=" textarea textarea-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            cols="30"
                            rows="3"
                        ></textarea>
                        <label className="label">
                            {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label flex justify-start items-center">
                            <input
                                onClick={() => setAccepted(!accepted)}
                                type="checkbox"
                                className="checkbox checkbox-secondary" />
                            <span className="label-text ml-3 text-secondary font-semibold text-lg">Remember me</span>
                        </label>
                    </div>

                    <input
                        disabled={!accepted}
                        className='btn btn-secondary text-white w-full max-w-sm mb-2'
                        type="submit"
                        value="Add"
                    />
                </div>
            </form>
        </section>
    );
};

export default AddProduct;