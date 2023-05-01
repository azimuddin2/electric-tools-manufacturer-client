import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import Sidebar from '../components/Sidebar';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)

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
                    <li><Sidebar to="/dashboard">My Order</Sidebar></li>
                    {
                        isAdmin && <>
                            <li><Sidebar to="/dashboard/users">All Users</Sidebar></li>
                            <li><Sidebar to="/dashboard/add-doctor">Add Doctor</Sidebar></li>
                            <li><Sidebar to="/dashboard/manage-doctors">Manage Doctors</Sidebar></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    </div>
    );
};

export default DashboardLayout;