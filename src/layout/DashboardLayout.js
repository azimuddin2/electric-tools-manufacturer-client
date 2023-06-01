import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import Sidebar from '../components/Sidebar';
import useAdmin from '../hooks/useAdmin';
import { BiEdit } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { MdManageHistory, MdOutlineRateReview, MdPostAdd } from 'react-icons/md';
import { HiOutlineClipboardDocumentList, HiOutlineHome } from 'react-icons/hi2';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 lg:bg-inherit bg-base-100 text-base-content">
                        <li><Sidebar to="/dashboard"> <HiOutlineClipboardDocumentList className='text-xl'></HiOutlineClipboardDocumentList> My Orders</Sidebar></li>
                        <li><Sidebar to="/dashboard/edit-profile"> <BiEdit className='text-xl'></BiEdit> Edit Profile</Sidebar></li>
                        <li><Sidebar to="/dashboard/add-review"> <MdOutlineRateReview className='text-xl'></MdOutlineRateReview> Add Review</Sidebar></li>
                        {
                            isAdmin && <>
                                <li><Sidebar to="/dashboard/users"> <FiUsers className='text-xl'></FiUsers> All Users</Sidebar></li>
                                <li><Sidebar to="/dashboard/add-product"> <MdPostAdd className='text-xl'></MdPostAdd> Add Product</Sidebar></li>
                                <li><Sidebar to="/dashboard/manage-products"> <MdManageHistory className='text-xl'></MdManageHistory> Manage Products</Sidebar></li>
                            </>
                        }
                        <li className='mt-auto'><Link to="/"> <HiOutlineHome className='text-xl'></HiOutlineHome> Back to Home</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;