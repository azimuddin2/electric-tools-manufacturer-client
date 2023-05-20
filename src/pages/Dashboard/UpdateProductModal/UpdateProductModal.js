import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateProductModal = ({ modalData, setUpdateProduct, refetch }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { _id, name, img } = modalData;

    const onSubmit = (data) => {
        const updateProduct = {
            name: data.name,
            img: data.img,
            price: data.price,
            description: data.description,
            minimumQuantity: data.minimumQuantity,
            availableQuantity: data.availableQuantity
        };

        fetch(`http://localhost:5000/tool/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateProduct)
        })
            .then(res => res.json())
            .then(result => {
                if(result.acknowledged){
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
                <div className="modal-box relative">
                    <label htmlFor="update-product-modal" className="btn btn-secondary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className='flex items-center justify-center border-b mb-4'>
                        <img src={img} alt="" className='w-24' />
                        <h1 className='lg:text-xl'>{`Updated Product ${name}`}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='card '>

                            <div className="form-control w-full mx-auto max-w-sm">
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

                            <div className="form-control w-full mx-auto max-w-sm">
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

                            <div className="form-control w-full mx-auto max-w-sm">
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

                            <div className="form-control w-full mx-auto max-w-sm">
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

                            <div className="form-control w-full mx-auto max-w-sm">
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

                            <div className="form-control w-full mx-auto max-w-sm">
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

                            <input
                                className='btn btn-secondary text-white w-full mx-auto max-w-sm mb-2'
                                type="submit"
                                value="Update"
                            />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;