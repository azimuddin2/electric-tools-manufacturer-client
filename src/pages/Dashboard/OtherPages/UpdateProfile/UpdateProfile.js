import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { BiImageAdd } from 'react-icons/bi';
import { CiEdit } from "react-icons/ci";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../../hooks/useTitle';
import Loading from '../../../Shared/Loading/Loading';
import { MdErrorOutline } from 'react-icons/md';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';

const UpdateProfile = () => {
    useTitle('Edit Profile');
    const { user, updateUserProfile } = useContext(AuthContext);
    const [countries, setCountries] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgBB_key;

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountries(data))
    }, [])

    const url = `http://localhost:5000/user?email=${user?.email}`;

    const { data: userInfo = {}, isLoading, error } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(url, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const onSubmit = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const { name, education, country, phone } = data;
                    const updateUserInfo = {
                        name: name,
                        education: education,
                        country: country,
                        phone: phone,
                        email: userInfo.email,
                        image: imgData.data.url,
                    };
                    //NOTE: User information firebase update
                    handleUpdateUserProfile(name, imgData.data.url, phone);

                    // NOTE: Save user information to the database
                    fetch(`http://localhost:5000/user/${userInfo._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updateUserInfo)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success('User profile updated successfully.');
                                reset();
                                navigate('/profile');
                            }
                        })
                }
            })
    };

    // Firebase database
    const handleUpdateUserProfile = (name, image, phone) => {
        const userInfo = {
            displayName: name,
            photoURL: image,
            phoneNumber: phone
        };
        updateUserProfile(userInfo)
            .then(() => { })
            .catch(error => {
                toast.error(error.message);
            })
    };

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            <div className='w-11/12 lg:w-4/5 mx-auto'>
                <div className='flex items-center lg:justify-start justify-center mb-4 lg:ml-6'>
                    <span className='text-2xl font-medium font-family'>Edit Your Profile</span>
                    <CiEdit className='text-2xl' />
                </div>
                <div className='bg-white shadow p-5 lg:p-10 rounded-xl'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email*</span>
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    defaultValue={userInfo?.email}
                                    className="input input-bordered w-full"
                                    disabled
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Name*</span>
                                </label>
                                <input
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is required'
                                        }
                                    })}
                                    defaultValue={userInfo?.name || ''}
                                    type="text"
                                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.name.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Education*</span>
                                </label>
                                <input
                                    {...register("education", {
                                        required: {
                                            value: true,
                                            message: 'Education is required'
                                        }
                                    })}
                                    defaultValue={userInfo?.education || ''}
                                    type="text"
                                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <label className="label">
                                    {errors.education?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.education.message}</span>}
                                </label>
                            </div>
                            <div className="form-control mt-4 lg:mt-0">
                                <label htmlFor='image' className="input input-bordered w-full h-24 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer text-center pt-4">
                                    <span className="label-text text-accent font-medium">Upload Photo</span>
                                    <div className=' flex justify-center items-center'>
                                        <BiImageAdd className='text-4xl text-accent'></BiImageAdd>
                                    </div>
                                </label>
                                <input
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Photo is required',
                                        },
                                    })}
                                    id="image"
                                    type="file"
                                    className="hidden"
                                />
                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.image.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Country*</span>
                                </label>
                                <select
                                    {...register("country", {
                                        required: {
                                            value: true,
                                            message: 'Country is required'
                                        }
                                    })}
                                    className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                                    <option disabled selected>Select your country</option>
                                    {
                                        countries.map((country) => <option
                                            key={country.cca3}
                                            value={country.name.common}
                                        >{country?.name.common}</option>)
                                    }
                                </select>
                                <label className="label">
                                    {errors.country?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.country.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Phone*</span>
                                </label>
                                <input
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: 'Phone is required'
                                        }
                                    })}
                                    defaultValue={userInfo?.phone || ''}
                                    type="text"
                                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <label className="label">
                                    {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.phone.message}</span>}
                                </label>
                            </div>
                        </div>
                        <div className='lg:mt-3 flex justify-end'>
                            <input
                                className='btn btn-primary text-white w-full lg:w-1/2 uppercase'
                                type="submit"
                                value="Update"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateProfile;