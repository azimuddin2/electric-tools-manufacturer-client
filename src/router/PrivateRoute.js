import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default PrivateRoute;