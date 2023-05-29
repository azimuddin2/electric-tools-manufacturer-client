import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";
import useTitle from '../../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AddReview = () => {
    useTitle('Add Review');
    const [value, setValue] = useState([]); // initial rating value
    const { user } = useContext(AuthContext);
    const [countries, setCountries] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const url = `http://localhost:5000/user?email=${user?.email}`;
    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(url, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
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
    }, []);

    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: true,
        value: value,
        color: "#ff9800",
        activeColor: "#dadada",
        onChange: newValue => {
            setValue(newValue);
        }
    };

    const handleReview = data => {
        const reviewData = {
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.image,
            country: data.country,
            description: data.description,
            rating: value,
        };
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

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="hero-content flex-col lg:flex-col-reverse">
                <div className="card shadow-xl">
                    <div className="card-body w-96">
                        <div>
                            <h2 className='text-2xl font-medium text-center mb-5'>Add a Review</h2>
                        </div>
                        <form onSubmit={handleSubmit(handleReview)}>

                            <div className="form-control w-full max-w-xs mb-3">
                                <input
                                    type="text"
                                    value={userInfo?.name}
                                    disabled
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name")}
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-3">
                                <input
                                    type="email"
                                    value={userInfo?.email}
                                    disabled
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email")}
                                />
                            </div>

                            <div className="form-control w-full max-w-sm">
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

                            <div className="form-control w-full max-w-xs">
                                <textarea
                                    placeholder='Review description...'
                                    type="text"
                                    className="pt-1 input input-bordered w-full max-w-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: 'Review is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                    {errors.description?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                </label>
                            </div>

                            <p className='text-secondary font-medium'>Please Rating :</p>
                            <div className='flex justify-center items-center '>
                                <ReactStars {...thirdExample} />
                            </div>
                            <input className='text-white btn w-full max-w-xs' type="submit" value="Save" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;