import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";
import useTitle from '../../../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const AddReview = () => {
    useTitle('Add Review');
    const { user } = useContext(AuthContext);
    const [value, setValue] = useState([]); // initial rating value
    const [countries, setCountries] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountries(data))
    }, []);

    const thirdExample = {
        size: 38,
        count: 5,
        isHalf: true,
        value: value,
        color: "#ff9800",
        activeColor: "#dadada",
        onChange: (newValue) => {
            setValue(newValue);
        }
    };

    const handleReview = (data) => {
        const reviewData = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL || null,
            country: data.country,
            description: data.description,
            rating: value,
        };
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    toast.success('Review added successfully');
                    reset();
                    navigate('/reviews');
                } else {
                    toast.error("Failed to add review");
                }
            })
    };

    return (
        <section className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            <div className="card bg-white shadow w-11/12 lg:w-2/5 mx-auto">
                <div className="card-body p-5 lg:p-8">
                    <div>
                        <h2 className='text-2xl text-center mb-3 uppercase font-medium font-family'>Add a Review</h2>
                    </div>
                    <form onSubmit={handleSubmit(handleReview)}>
                        <div className="form-control mb-3">
                            <input
                                {...register("name")}
                                type="text"
                                defaultValue={user?.displayName}
                                disabled
                                className="input input-bordered w-full"
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
                                className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                                <option disabled selected>Select your country</option>
                                {
                                    countries.map((country) => <option
                                        key={country.cca3}
                                        value={country.name.common}
                                    >{country.name.common}</option>)
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
                                style={{ fontSize: '16px' }}
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