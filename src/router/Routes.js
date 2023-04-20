import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ToolDetails from "../pages/ToolDetails/ToolDetails";
import Tools from "../pages/Tools/Tools";

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
                element: <ToolDetails></ToolDetails>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/tool/${params.id}`)
                }
            },
        ]
    }
]);

export default router;