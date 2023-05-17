import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import useTitle from '../../../hooks/useTitle';

const UpdateProfile = () => {
    useTitle('View Profile');
    const { user, loading } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const handleProfile = data => {
        console.log(data)
        fetch('http://localhost:5000/profile', {
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
    }

    if (loading) {
        return
    }

    return (
        <section>
            <div className='h-full p-4 lg:p-10'>
                <div>
                    <h2 className='text-2xl font-medium mb-5 lg:ml-28'>Update Your Profile</h2>
                </div>
                <form onSubmit={handleSubmit(handleProfile)}
                    className='card shadow-xl border grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 p-4 lg:p-8 lg:w-4/5 mx-auto'
                >

                    <div className="form-control w-full max-w-sm">
                        <input
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
                            type="email"
                            value={user?.email}
                            className="input input-bordered w-full max-w-sm"
                            disabled
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <input
                            type="text"
                            value={user?.displayName}
                            className="input input-bordered w-full max-w-sm"
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

                    <div className="form-control w-full max-w-sm">
                        <input
                            type="text"
                            placeholder='Education'
                            className="input input-bordered w-full max-w-sm"
                            {...register("education", {
                                required: {
                                    value: true,
                                    message: 'Education is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.education?.type === 'required' && <span className="label-text-alt text-red-500">{errors.education.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <input
                            type="text"
                            placeholder='City'
                            className="input input-bordered w-full max-w-sm"
                            {...register("city", {
                                required: {
                                    value: true,
                                    message: 'City is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.city?.type === 'required' && <span className="label-text-alt text-red-500">{errors.city.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <input
                            type="text"
                            placeholder='Phone'
                            className="input input-bordered w-full max-w-sm"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: 'Phone is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <input
                            type="text"
                            placeholder='LinkedIn Link'
                            className="input input-bordered w-full max-w-sm"
                            {...register("linkedIn", {
                                required: {
                                    value: true,
                                    message: 'LinkedIn is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.linkedIn?.type === 'required' && <span className="label-text-alt text-red-500">{errors.linkedIn.message}</span>}
                        </label>
                    </div>
                    <input className=' btn  w-full max-w-sm' type="submit" value="Save" />
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;