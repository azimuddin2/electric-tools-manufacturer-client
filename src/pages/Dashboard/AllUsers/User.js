import React from 'react';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { GrUserAdmin } from 'react-icons/gr';

const User = ({ user, index, refetch, setDeletingUser }) => {
    const { _id, name, email } = user;

    const handleMakeAdmin = (id) => {
        fetch(`https://electric-tools-server-seven.vercel.app/user/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
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
                    user?.role ?
                        <GrUserAdmin className='text-2xl'></GrUserAdmin>
                        :
                        <button
                            onClick={() => handleMakeAdmin(_id)}
                            className="btn btn-sm capitalize btn-primary text-white font-bold bg-gradient-to-r from-secondary to-primary"
                        >
                            Make Admin
                        </button>
                }
            </td>
            <td>
                <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="confirmation-modal"
                >
                    <RiDeleteBin5Line className='text-2xl text-red-500 cursor-pointer'></RiDeleteBin5Line>
                </label>
            </td>
        </tr>
    );
};

export default User;