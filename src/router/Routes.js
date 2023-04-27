import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ToolDetails from "../pages/ToolDetails/ToolDetails";
import Tools from "../pages/Tools/Tools";
import Login from "../pages/Login/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

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
    }
]);

export default router;