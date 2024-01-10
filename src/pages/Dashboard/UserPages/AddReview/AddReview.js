import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";
import useTitle from '../../../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const AddReview = () => {
    useTitle('Add Review');
    const [value, setValue] = useState([]); // initial rating value
    const { user } = useContext(AuthContext);
    const [countries, setCountries] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

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
                    navigate('/reviews');
                } else {
                    toast.error("Failed to add review");
                }
            })
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='bg-gray-50 h-screen lg:h-full py-16'>
            <div className="card bg-white shadow w-11/12 lg:w-2/5 mx-auto">
                <div className="card-body p-6 lg:p-8">
                    <div>
                        <h2 className='text-2xl font-medium text-center mb-3 uppercase'>Add a Review</h2>
                    </div>
                    <form onSubmit={handleSubmit(handleReview)}>

                        <div className="form-control mb-3">
                            <input
                                type="text"
                                value={userInfo?.name}
                                disabled
                                className="input input-bordered w-full"
                                {...register("name")}
                            />
                        </div>

                        <div className="form-control">
                            <select
                                {...register("country", {
                                    required: {
                                        value: true,
                                        message: 'Country is required'
                                    }
                                })}
                                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
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

                            <textarea
                                {...register('description', {
                                    required: {
                                        value: true,
                                        message: 'Review field is required'
                                    }
                                })}
                                name="description"
                                cols="30"
                                rows="4"
                                placeholder='Type here review message...'
                                className='textarea textarea-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
                            ></textarea>

                            <label className="label">
                                {errors.description?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.description.message}</span>}
                            </label>

                        </div>

                        <div className='my-2'>
                            <h3 className='text-secondary font-medium'>Please Rating:</h3>
                            <h4 className='flex justify-center items-center '>
                                <ReactStars {...thirdExample} />
                            </h4>
                        </div>

                        <input className='btn btn-primary w-full text-white uppercase' type="submit" value="Save" />

                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddReview;