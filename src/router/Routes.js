import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ToolDetails from "../pages/ToolDetails/ToolDetails";
import Tools from "../pages/Tools/Tools";
import Login from "../pages/Login/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import AdminRoute from "./AdminRoute";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import UpdateProfile from "../pages/Dashboard/UpdateProfile/UpdateProfile";
import Profile from "../pages/Profile/Profile";
import Reviews from "../pages/Reviews/Reviews";
import DisplayError from "../pages/Shared/DisplayError/DisplayError";

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
                element: <Tools></Tools>
            },
            {
                path: '/tool/:id',
                element: <PrivateRoute>
                    <ToolDetails></ToolDetails>
                </PrivateRoute>,
                loader: async ({ params }) => {
                    return fetch(`https://electric-tools-server-seven.vercel.app/tool/${params.id}`)
                }
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
            {
                path: 'profile',
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/edit-profile',
                element: <UpdateProfile></UpdateProfile>
            },
            {
                path: '/dashboard/add-review',
                element: <AddReview></AddReview>
            },
            {
                path: '/dashboard/users',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <AdminRoute>
                    <AddProduct></AddProduct>
                </AdminRoute>

            },
            {
                path: '/dashboard/manage-products',
                element: <AdminRoute>
                    <ManageProducts></ManageProducts>
                </AdminRoute>
            }
        ]
    },
]);

export default router;