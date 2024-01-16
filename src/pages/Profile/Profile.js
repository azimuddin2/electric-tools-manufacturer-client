import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaGraduationCap } from 'react-icons/fa';
import { BsFileEarmarkPerson } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { BiPhoneCall, BiSolidUserAccount } from "react-icons/bi";
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Loading from '../Shared/Loading/Loading';
import ErrorMessage from '../Shared/ErrorMessage/ErrorMessage';
import profile from '../../assets/images/profile.gif';

const Profile = () => {
    useTitle('My Profile');
    const { user } = useContext(AuthContext);

    const url = `https://electric-tools-manufacturer-server-two.vercel.app/user?email=${user?.email}`;
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

    const { name, email, image, education, country, phone } = userInfo;

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className="hero lg:min-h-screen py-12 lg:py-20">
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='lg:flex justify-center items-center hidden'>
                    <img src={profile} alt="Profile" />
                </div>
                <div className="shadow rounded-xl p-3 py-6 lg:p-10 w-11/12 lg:w-full mx-auto">
                    <div className='text-center'>
                        <div>
                            {
                                image ?
                                    <div className="avatar">
                                        <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={image} alt={name} />
                                        </div>
                                    </div>
                                    :
                                    <BiSolidUserAccount className='text-[190px] text-primary mx-auto' />
                            }
                        </div>
                        <Link to='/dashboard/edit-profile'>
                            <button className="btn btn-primary btn-sm text-white capitalize mt-3 rounded-sm">
                                Edit Profile <FaEdit className='text-lg' />
                            </button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto mt-6 bg-gray-50 p-2 lg:p-5 rounded">
                        <table className="table w-full">
                            <tbody>
                                <tr>
                                    <th className='flex items-center'>
                                        <BsFileEarmarkPerson className='text-lg mr-1' />
                                        <span>Name:</span>
                                    </th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th className='flex items-center w-full'>
                                        <MdOutlineMarkEmailUnread className='text-lg mr-1' />
                                        <span>Email:</span>
                                    </th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th className='flex items-center'>
                                        <BiPhoneCall className='text-lg mr-1' />
                                        <span>Phone:</span>
                                    </th>
                                    <td>{phone || "Not added yet!"}</td>
                                </tr>
                                <tr>
                                    <th className='flex items-center'>
                                        <FaGraduationCap className='text-lg mr-1' />
                                        <span>Education:</span>
                                    </th>
                                    <td>{education || "Not added yet!"}</td>
                                </tr>
                                <tr>
                                    <th className='flex items-center'>
                                        <GrLocation className='text-lg mr-1' />
                                        <span>Country:</span>
                                    </th>
                                    <td>{country || "Not added yet!"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;