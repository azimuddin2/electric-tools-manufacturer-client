import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';

const UpdateProductModal = ({ updateProduct, setUpdateProduct, refetch }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { _id, name, rating } = updateProduct;

    const [newRating, setNewRating] = useState(rating);
    const changeRating = (rat) => {
        setNewRating(rat);
    };

    const onSubmit = (data) => {
        const { image, minimumQuantity, availableQuantity, price, description } = data;
        const updateProductData = {
            name,
            image,
            minimumQuantity,
            availableQuantity,
            price: parseInt(price),
            description,
            rating: newRating
        };
        fetch(`http://localhost:5000/tool/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateProductData)
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    refetch();
                    toast.success('Product updated successfully');
                    reset();
                    setUpdateProduct(null);
                }
            })
    };

    return (
        <div>
            <input type="checkbox" id="update-product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="update-product-modal" className="btn btn-secondary text-white btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className='border-b mb-5 text-center'>
                        <h1 className='text-lg lg:text-2xl font-semibold text-secondary mb-2'>Update Product <span className='text-primary'>{name}</span> Tool.</h1>
                    </div>
                    <div className='lg:px-6'>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4'
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Product Name*</span>
                                </label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    value={name}
                                    disabled
                                    placeholder='Type here'
                                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
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
                            <div className="form-control lg:mt-[-30px]">
                                <h2 className='font-medium'>Product Rating*</h2>
                                <div className='text-center'>
                                    <StarRatings
                                        rating={newRating}
                                        starRatedColor="#4158f3"
                                        name="rating"
                                        starSpacing="1px"
                                        changeRating={changeRating}
                                        starDimension="30px"
                                        starHoverColor="#4158f3"
                                    />
                                </div>
                            </div>
                            <input
                                className='btn btn-primary text-white w-full uppercase my-3'
                                type="submit"
                                value="Update"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;