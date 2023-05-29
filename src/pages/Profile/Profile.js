import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {

    const { user } = useContext(AuthContext);
    const url = `https://electric-tools-server-seven.vercel.app/user?email=${user?.email}`;

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

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row shadow-xl rounded-xl lg:p-14">
                <div className='text-center lg:mr-6'>
                    {
                        userInfo.image ?
                            <img src={userInfo?.image} alt='' className="rounded-full w-60 h-60" />
                            :
                            <FaUserCircle className=' text-9xl'></FaUserCircle>
                    }
                    <Link to='/dashboard/edit-profile'>
                        <button className="btn btn-primary btn-sm capitalize mt-5">Edit Profile <FaEdit className='ml-1 text-lg'></FaEdit> </button>
                    </Link>
                </div>


                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* <thead>
                            <tr>
                                <th></th>
                                <th className=' capitalize'>My Profile</th>
                                <th></th>
                            </tr>
                        </thead> */}
                        <tbody>
                            <tr>
                                <td>Full Name :</td>
                                <td>
                                    {user?.displayName}
                                </td>
                            </tr>
                            <tr>
                                <td>Email Address :</td>
                                <td>{user?.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number :</td>
                                <td>
                                    {
                                        userInfo?.phone ?
                                            <>{userInfo.phone}</>
                                            :
                                            ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Education :</td>
                                <td>
                                    {
                                        userInfo?.education ?
                                            <>{userInfo.education}</>
                                            :
                                            ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Country :</td>
                                <td>
                                    {
                                        userInfo.country ?
                                            <>{userInfo.country}</>
                                            :
                                            ''
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default Profile;