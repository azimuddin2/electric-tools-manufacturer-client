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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
                    return fetch(`http://localhost:5000/tool/${params.id}`)
                }
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        // errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/users',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/add-product',
                element: <AddProduct></AddProduct>
               
            },
            // {
            //     path: '/dashboard/manage-doctors',
            //     element: <AdminRoute>
            //         <ManageDoctors></ManageDoctors>
            //     </AdminRoute>
            // }
        ]
    },
]);

export default router;