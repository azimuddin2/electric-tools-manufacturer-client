import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import DisplayError from "../pages/Shared/DisplayError/DisplayError";
import Home from "../pages/Home/Home/Home";
import AllTools from "../pages/AllTools/AllTools";
import Reviews from "../pages/Reviews/Reviews";
import Login from "../pages/Login/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
import ToolDetails from "../pages/ToolDetails/ToolDetails";
import PrivateRoute from "./PrivateRoute";
import MyOrders from "../pages/Dashboard/UserPages/MyOrders/MyOrders";
import DashboardLayout from "../layout/DashboardLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'tools',
                element: <AllTools></AllTools>,
                loader: async () => {
                    return fetch('http://localhost:5000/totalTools')
                }
            },
            {
                path: '/tool/:toolId',
                element: <PrivateRoute><ToolDetails></ToolDetails></PrivateRoute>
            },
            {
                path: 'reviews',
                element: <Reviews></Reviews>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            // {
            //     path: 'profile',
            //     element: <PrivateRoute>
            //         <Profile></Profile>
            //     </PrivateRoute>
            // }
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [


             // {
            //     path: '/dashboard/users',
            //     element: <AdminRoute>
            //         <AllUsers></AllUsers>
            //     </AdminRoute>
            // },
            // {
            //     path: '/dashboard/add-product',
            //     element: <AdminRoute>
            //         <AddProduct></AddProduct>
            //     </AdminRoute>

            // },
            // {
            //     path: '/dashboard/manage-products',
            //     element: <AdminRoute>
            //         <ManageProducts></ManageProducts>
            //     </AdminRoute>
            // }


            // NOTE: User Routes
            {
                path: 'my-orders',
                element: <MyOrders></MyOrders>
            },
            // {
            //     path: '/dashboard/edit-profile',
            //     element: <UpdateProfile></UpdateProfile>
            // },
            // {
            //     path: '/dashboard/add-review',
            //     element: <AddReview></AddReview>
            // },


           
        ]
    },

]);

export default router;