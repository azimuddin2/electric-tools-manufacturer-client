import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { BiEdit } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { MdManageHistory, MdOutlineRateReview, MdPostAdd } from 'react-icons/md';
import { HiOutlineClipboardDocumentList, HiOutlineHome } from 'react-icons/hi2';
import ActiveLink from '../components/ActiveLink/ActiveLink';
import DashboardNavbar from '../pages/Shared/DashboardNavbar/DashboardNavbar';
import logo from '../assets/icons/logo-black.svg';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <DashboardNavbar></DashboardNavbar>
            <div className="drawer block lg:grid lg:drawer-open mx-auto max-w-screen-2xl">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                {/* <div className="drawer-content">
                    <Outlet></Outlet>
                </div> */}

                {/* <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-white text-base-content h-screen">

                        <Link to='/'>
                            <img src={logo} alt="Logo" className='mx-6 mb-5 lg:hidden' style={{ height: '40px' }} />
                        </Link>

                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <ActiveLink to="dashboard">
                                            Dashboard
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/users">
                                            <FiUsers className='text-xl' /> All Users
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/add-product">
                                            <MdPostAdd className='text-xl' /> Add Product
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/manage-products">
                                            <MdManageHistory className='text-xl' /> Manage Products
                                        </ActiveLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <ActiveLink to="/dashboard/my-orders">
                                            <HiOutlineClipboardDocumentList className='text-2xl' /> My Orders
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/edit-profile">
                                            <BiEdit className='text-xl' /> Edit Profile
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/add-review">
                                            <MdOutlineRateReview className='text-xl' /> Add Review
                                        </ActiveLink>
                                    </li>
                                </>
                        }

                        <li className='mt-auto'>
                            <Link to="/">
                                <HiOutlineHome className='text-xl' /> Back to Home
                            </Link>
                        </li>

                    </ul>
                </div> */}

            </div>
        </div>
    );
};

export default DashboardLayout;