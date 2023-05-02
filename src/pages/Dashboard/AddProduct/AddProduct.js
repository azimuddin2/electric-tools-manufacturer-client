import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async data => {
        console.log(data)
        fetch('http://localhost:5000/tool', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Product added successfully');
                    reset();
                }
                else {
                    toast.error('Failed to add the Product')
                }
            })

    };

    return (
        <section className=''>
            <h1 className='text-center font-medium text-cyan-500 text-2xl mt-4 mb-2'>Add a New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='card shadow-xl w-96 mx-auto'>

                    <div className="form-control w-full max-w-xs mb-4 mx-auto">
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>


                    <div className="form-control w-full max-w-xs mb-4 mx-auto">
                        <input
                            type="availableQuantity"
                            placeholder="Available Quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("availableQuantity", {
                                required: {
                                    value: true,
                                    message: 'Available Quantity is Required'
                                },
                                max: {
                                    value: 100,
                                    message: 'Available Quantity 100'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}
                            {errors.availableQuantity?.type === 'max' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}
                        </label>
                    </div>


                    <div className="form-control w-full max-w-xs mb-4 mx-auto">
                        <input
                            type="minimumQuantity"
                            placeholder="Minimum Quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("minimumQuantity", {
                                required: {
                                    value: true,
                                    message: 'Minimum Quantity is Required'
                                },
                                min: {
                                    value: 5,
                                    message: 'Minimum Quantity 5'
                                },
                            })}
                        />
                        <label className="label">
                            {errors.minimumQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minimumQuantity.message}</span>}
                            {errors.minimumQuantity?.type === 'min' && <span className="label-text-alt text-red-500">{errors.minimumQuantity.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs mb-4 mx-auto">
                        <input
                            {...register("img")}
                            type="url"
                            placeholder="Image url"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="form-control w-full max-w-xs mb-4 mx-auto">
                        <input
                            {...register("price")}
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="form-control w-full max-w-xs mb-4 mx-auto">
                        <textarea
                            {...register("description")}
                            name="description" className="input input-bordered w-full max-w-xs" placeholder='Product Description' id="" cols="30" rows="10"></textarea>
                    </div>

                    <input className='btn btn-secondary text-white w-full max-w-xs mb-10 mx-auto' type="submit" value="Add" />
                </div>
            </form>
        </section>
    );
};

export default AddProduct;