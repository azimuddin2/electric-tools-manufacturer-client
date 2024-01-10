import React from 'react';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { GrUserAdmin } from 'react-icons/gr';

const User = ({ user, index, refetch, setDeletingUser }) => {
    const { _id, name, email, role } = user;

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/user/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    toast.success(`Make admin successful ${email}`)
                    refetch();
                }
            })
    };

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {
                    role === 'admin' ?
                        (
                            <div className='flex items-center'>
                                <GrUserAdmin className='text-xl'></GrUserAdmin>
                                <span className='text-lg font-semibold'>Admin</span>
                            </div>
                        )
                        :
                        (
                            <button
                                onClick={() => handleMakeAdmin(_id)}
                                className="btn btn-sm capitalize btn-primary text-white font-semibold"
                            >
                                MakeAdmin
                            </button>
                        )
                }
            </td>
            <td>
                <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="confirmation-modal"
                    className='tooltip tooltip-top'
                    data-tip="Delete"
                >
                    <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                </label>
            </td>
        </tr>
    );
};

export default User;