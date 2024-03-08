import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import ProtectRouted from "./protectRouted";

export const routeList = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    }

];