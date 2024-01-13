import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import { CgLogOut } from 'react-icons/cg';
import logo from '../../../assets/icons/logo-black.svg'
import { RiProfileLine } from 'react-icons/ri';

const DashboardNavbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                toast.error(error.message);
            })
    };

    return (
        <div className="navbar bg-white max-w-screen-2xl mx-auto lg:px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost btn-sm text-secondary lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
                <Link to={'/'}>
                    <img src={logo} alt="logo" className='w-full' />
                </Link>
            </div>
            <div className="navbar-end">
                <div className="indicator cursor-pointer" style={{ marginRight: '20px' }}>
                    <MdOutlineNotificationsActive className='text-2xl text-secondary' />
                    <span className="badge badge-sm indicator-item bg-primary border-none text-white font-semibold">{0}</span>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div>
                            {
                                user?.photoURL ?
                                    <div className="avatar online">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt="userImg" />
                                        </div>
                                    </div>
                                    :
                                    <div className="avatar online placeholder">
                                        <div className="bg-primary text-white rounded-full w-10">
                                            <span className="text-2xl">{user.displayName.slice(0, 1)}</span>
                                        </div>
                                    </div>
                            }
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] py-8 px-6 shadow bg-secondary text-white rounded-box w-80">
                        <div className='text-center mb-4'>
                            <div>
                                {
                                    user?.photoURL ?
                                        <div className="avatar online">
                                            <div className="w-20 rounded-full">
                                                <img src={user?.photoURL} alt="userImg" />
                                            </div>
                                        </div>
                                        :
                                        <div className="avatar online placeholder">
                                            <div className="bg-primary text-white rounded-full w-20">
                                                <span className="text-5xl">{user.displayName.slice(0, 1)}</span>
                                            </div>
                                        </div>
                                }
                            </div>
                            <h1 className='text-lg font-medium mt-1'>Hi, {user.displayName}!</h1>
                            <h1 className='text-md mb-3'>{user.email}</h1>
                        </div>
                        <li>
                            <Link
                                to={'/profile'}
                                className="justify-between text-lg hover:bg-[#F1F5F9] hover:text-secondary font-medium"
                            >
                                View Profile
                                <span className="badge"><RiProfileLine className='text-lg' /></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/dashboard/edit-profile'}
                                className="justify-between text-lg hover:bg-[#F1F5F9] hover:text-secondary font-medium"
                            >
                                Edit Profile
                                <span className="badge"><BiSolidEdit className='text-lg' /></span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className='text-lg bg-primary text-white hover:bg-[#F1F5F9] hover:text-secondary font-medium mt-2'
                            >
                                Logout
                                <span className="badge"><CgLogOut className='text-lg' /></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;