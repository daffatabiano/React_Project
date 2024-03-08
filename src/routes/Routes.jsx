import Home from "../page/Home";
import Login from "../page/Login";
import ProtectRouted from "./protectRouted";

export const routeList = [
    {
        path: '/',
        element: 
            <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },

];