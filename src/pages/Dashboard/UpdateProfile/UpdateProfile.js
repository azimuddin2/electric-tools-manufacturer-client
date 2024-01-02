import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import useTitle from '../../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { BiImageAdd } from 'react-icons/bi';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    useTitle('Edit Profile');
    const { user, updateUserProfile } = useContext(AuthContext);
    const [countries, setCountries] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgBB_key;

    const url = `http://localhost:5000/user?email=${user?.email}`;

    const { data: userInfo, isLoading } = useQuery({
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

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountries(data))
    }, [])


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
                    const updateUserInfo = {
                        name: data.name,
                        email: userInfo?.email,
                        education: data.education,
                        image: imgData.data.url,
                        country: data.country,
                        phone: data.phone,
                    }
                    console.log(updateUserInfo);
                    // Firebase database update
                    handleUpdateUserProfile(data.name, imgData.data.url, data.phone);

                    // save user information to the database
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

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='lg:bg-gray-50 h-full'>
            <div className='p-4 lg:p-10'>
                <div>
                    <h2 className='text-2xl font-medium mb-5 lg:ml-28'>Edit Your Profile</h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='card bg-white shadow-xl grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 p-4 lg:p-8 lg:w-4/5 mx-auto'
                >

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            defaultValue={userInfo?.email}
                            className="input input-bordered w-full max-w-sm"
                            disabled
                        />
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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

                    <div className="form-control w-full max-w-sm mt-4 lg:mt-0">
                        <label htmlFor='image' className="input input-bordered w-full h-24 max-w-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer text-center pt-4">
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
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Country</span>
                        </label>
                        <select
                            {...register("country", {
                                required: {
                                    value: true,
                                    message: 'Country is required'
                                }
                            })}
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                            <option disabled selected>Select your country</option>
                            {
                                countries.map((country) => <option
                                    key={country.cca3}
                                    value={country.name.common}
                                >{country?.name.common}</option>)
                            }
                        </select>
                        <label className="label">
                            {errors.country?.type === 'required' && <span className="label-text-alt text-red-500">{errors.country.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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

                    <input className='btn text-white  w-full max-w-sm' type="submit" value="Save" />
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;