import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import CustomLink from './CustomLink';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                toast.error(error.message);
            })
    };

    const menuItem = <>
        <li><CustomLink to="/">Home</CustomLink></li>
        <li><CustomLink to="/tools">Tools</CustomLink></li>
        <li><CustomLink to="/about">About</CustomLink></li>
        <li>
            {
                user?.uid ?
                    <button className=' font-medium' onClick={handleLogout}>Logout</button>
                    :
                    <CustomLink to='/login'>Login</CustomLink>
            }
        </li>
    </>

    return (
        <div className='bg-secondary text-white lg:px-8'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-secondary rounded-box w-52">
                            {menuItem}
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex items-center">
                    <ul className="menu menu-horizontal p-0 text-white">
                        {menuItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;