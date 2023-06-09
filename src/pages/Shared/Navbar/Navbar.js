import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import CustomLink from './CustomLink';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { BsCheck2Circle, BsTools } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { MdOutlineDashboard } from 'react-icons/md';
import { CgLogIn, CgLogOut } from 'react-icons/cg';

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
        <li><CustomLink to="/"><HiOutlineHome className='text-xl lg:hidden'></HiOutlineHome>Home</CustomLink></li>
        <li><CustomLink to="/tools"><BsTools className='text-xl lg:hidden'></BsTools>Tools</CustomLink></li>
        <li><CustomLink to="/about"><BsCheck2Circle className='text-xl lg:hidden'></BsCheck2Circle>About</CustomLink></li>
        <li><CustomLink to="/reviews"><BiMessageDetail className='text-xl lg:hidden'></BiMessageDetail>Reviews</CustomLink></li>
        {
            user?.uid && <li><CustomLink to='/dashboard'><MdOutlineDashboard className='text-xl lg:hidden'></MdOutlineDashboard>Dashboard</CustomLink></li>
        }
        <li>
            {
                user?.uid ?
                    <button
                        className='font-medium'
                        onClick={handleLogout}
                    >
                        <CgLogOut className='text-xl lg:hidden'></CgLogOut>Logout
                    </button>
                    :
                    <CustomLink to='/login'> <CgLogIn className='text-xl lg:hidden'></CgLogIn> Login</CustomLink>
            }
        </li>
        {
            user?.uid && <li title='View Profile'>
                <Link to='/profile'>
                    {
                        user?.photoURL ?
                            <img src={user?.photoURL} alt='' className='w-9 h-9 border-2 rounded-full border-green-500' />
                            :
                            <FaUserCircle className='text-3xl'></FaUserCircle>
                    }
                </Link>
            </li>
        }
    </>

    return (
        <div className='bg-secondary text-white lg:px-12'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-secondary rounded-box w-56">
                            {menuItem}
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex items-center">
                    <ul className="menu menu-horizontal p-0 text-white">
                        {menuItem}
                    </ul>
                </div>
                <div className="navbar-end lg:hidden">
                    <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;