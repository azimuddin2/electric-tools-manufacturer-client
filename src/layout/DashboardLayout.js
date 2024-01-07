import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { BiEdit } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { MdManageHistory, MdOutlineRateReview, MdPostAdd } from 'react-icons/md';
import { HiOutlineClipboardDocumentList, HiOutlineHome } from 'react-icons/hi2';
import ActiveLink from '../components/ActiveLink/ActiveLink';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer block lg:grid lg:drawer-open mx-auto max-w-screen-2xl">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 lg:bg-inherit bg-base-100 text-base-content">



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
                                            <HiOutlineClipboardDocumentList className='text-xl' /> My Orders
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
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;