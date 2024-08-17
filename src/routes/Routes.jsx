import Main from "@/layouts/Main";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                index: true,
                element:<Home/>
            },
        ]
    }
]);

export default router;
