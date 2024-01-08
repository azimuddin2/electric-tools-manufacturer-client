import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { FiUsers } from 'react-icons/fi';
import { MdManageHistory, MdPostAdd } from 'react-icons/md';
import { LuListTodo } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbPencilStar } from "react-icons/tb";
import { BsInfoCircle } from 'react-icons/bs';
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
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-white text-base-content h-screen">
                        <Link to='/'>
                            <img src={logo} alt="Logo" className='mx-auto mb-5 lg:hidden' />
                        </Link>
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <ActiveLink to="dashboard">
                                            <RxDashboard className='text-xl' />
                                            <span>Dashboard</span>
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/users">
                                            <FiUsers className='text-xl' />
                                            <span>All Users</span>
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/add-product">
                                            <MdPostAdd className='text-xl' />
                                            <span>Add Product</span>
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/manage-products">
                                            <MdManageHistory className='text-xl' />
                                            <span>Manage Products</span>
                                        </ActiveLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <ActiveLink to="/dashboard/my-orders">
                                            <LuListTodo className='text-xl' />
                                            <span>My Orders</span>
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/add-review">
                                            <TbPencilStar className='text-xl' />
                                            <span>Add Review</span>
                                        </ActiveLink>
                                    </li>
                                    <li>
                                        <ActiveLink to="/dashboard/payment-history">
                                            <BsInfoCircle className='text-xl' />
                                            <span>Payment History</span>
                                        </ActiveLink>
                                    </li>
                                </>
                        }
                        <li className='mt-auto'>
                            <Link to="/">
                                <FaHome className='text-xl' />
                                <span style={{ fontWeight: '500', fontSize: '16px' }} className='font-semibold'>Back to Home</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;