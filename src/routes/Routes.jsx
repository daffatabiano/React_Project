import DetailUser from '../page/DetailUser';
import Home from '../page/Home';
import ListUsers from '../page/ListUsers';
import Login from '../page/Login';
import Register from '../page/Register';
import ProtectRouted from './protectRouted';

export const routeList = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/',
        element: (
            <ProtectRouted>
                <Home />
            </ProtectRouted>
        ),
    },
    {
        path: '/friends',
        element: (
            <ProtectRouted>
                <ListUsers />
            </ProtectRouted>
        ),
    },
    {
        path: '/users/:id',
        element: (
            <ProtectRouted>
                <DetailUser />
            </ProtectRouted>
        ),
    },
];
