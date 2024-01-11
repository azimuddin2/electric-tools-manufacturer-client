import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import User from './User';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import useTitle from '../../../../hooks/useTitle';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';

const AllUsers = () => {
    useTitle('All Users');
    const [deletingUser, setDeletingUser] = useState(null);

    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteUser = (user) => {
        fetch(`http://localhost:5000/user/${user._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`User ${user.email} deleted successfully`);
                }
            })
    };

    const closeModal = () => {
        setDeletingUser(null);
    };

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            <div className='bg-white w-11/12 lg:w-4/5 mx-auto p-5 lg:p-10'>
                <h1 className='text-2xl font-medium mb-4'>All Users: {users.length}</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className='bg-gray-100 font-bold uppercase'>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <User
                                    key={user._id}
                                    index={index}
                                    user={user}
                                    refetch={refetch}
                                    setDeletingUser={setDeletingUser}
                                ></User>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingUser && <ConfirmationModal
                    modalData={deletingUser}
                    successModal={handleDeleteUser}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllUsers;