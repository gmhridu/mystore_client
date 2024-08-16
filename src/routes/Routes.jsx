import Main from "@/layouts/Main";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                index: true,
                element:<h2>Home</h2>
            },
        ]
    }
]);

export default router;
