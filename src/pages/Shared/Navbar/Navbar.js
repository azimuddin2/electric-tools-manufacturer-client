import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import CustomLink from './CustomLink';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { IoHomeOutline } from 'react-icons/io5';
import { BsCheck2Circle, BsTools } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { MdOutlineDashboard } from 'react-icons/md';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    const handleLogout = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('accessToken');
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    const navOptions = <>
        <li>
            <CustomLink to="/">
                <IoHomeOutline className='text-xl lg:hidden' />Home
            </CustomLink>
        </li>
        <li>
            <CustomLink to="/tools">
                <BsTools className='text-xl lg:hidden' />Tools
            </CustomLink>
        </li>
        <li>
            <CustomLink to="/about">
                <BsCheck2Circle className='text-xl lg:hidden' />About
            </CustomLink>
        </li>
        <li>
            <CustomLink to="/reviews">
                <BiMessageDetail className='text-xl lg:hidden' />Reviews
            </CustomLink>
        </li>
        {
            user?.uid && (
                <li>
                    {
                        isAdmin ?
                            <CustomLink to='/dashboard'>
                                <MdOutlineDashboard className='text-xl lg:hidden' />Dashboard
                            </CustomLink>
                            :
                            <CustomLink to='/dashboard/my-orders'>
                                <MdOutlineDashboard className='text-xl lg:hidden' />Dashboard
                            </CustomLink>
                    }
                </li>
            )
        }
        <li>
            {
                user?.uid ?
                    (
                        <button
                            className='font-medium'
                            onClick={handleLogout}
                        >
                            <CgLogOut className='text-xl lg:hidden'></CgLogOut>Logout
                        </button>
                    )
                    :
                    (
                        <CustomLink to='/login'>
                            <CgLogIn className='text-xl lg:hidden'></CgLogIn> Login
                        </CustomLink>
                    )
            }
        </li>
    </>

    return (
        <div className='bg-secondary text-white py-1 px-2 lg:px-0'>
            <div className="navbar container mx-auto max-w-screen-lg">
                <div className="navbar-start">
                    <Link to="/">
                        <img className='w-full' src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex items-center">
                    <ul className="flex items-center menu menu-horizontal p-0 text-white">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end lg:hidden">
                    <div className="dropdown">
                        <label htmlFor='' tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul
                            tabIndex="0"
                            className="bg-secondary z-50 menu menu-compact dropdown-content mt-4 p-5 shadow w-64 right-6 rounded-lg"
                        >
                            {navOptions}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;