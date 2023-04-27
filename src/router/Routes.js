import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ToolDetails from "../pages/ToolDetails/ToolDetails";
import Tools from "../pages/Tools/Tools";
import Login from "../pages/Login/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";

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
        // children: [
        //     {
        //         path: '/dashboard',
        //         element: <MyAppointment></MyAppointment>
        //     },
        //     {
        //         path: '/dashboard/users',
        //         element: <AdminRoute>
        //             <AllUsers></AllUsers>
        //         </AdminRoute>
        //     },
        //     {
        //         path: '/dashboard/add-doctor',
        //         element: <AdminRoute>
        //             <AddDoctor></AddDoctor>
        //         </AdminRoute>
        //     },
        //     {
        //         path: '/dashboard/manage-doctors',
        //         element: <AdminRoute>
        //             <ManageDoctors></ManageDoctors>
        //         </AdminRoute>
        //     }
        // ]
    },
]);

export default router;