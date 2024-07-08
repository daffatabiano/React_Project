import EditProfile from '../page/EditProfile';
import Home from '../page/Home';
import Login from '../page/Login';
import Profile from '../page/Profile';
import Register from '../page/Register';
import ProtectRouted from './ProtectedRouted';

export const routeList = [
    {
        path: '/',
        element: (
            <ProtectRouted>
                <Home />
            </ProtectRouted>
        ),
    },
    {
        path: '/profile',
        element: (
            <ProtectRouted>
                <Profile />
            </ProtectRouted>
        ),
    },
    {
        path: '/edit-profile',
        element: (
            <ProtectRouted>
                <EditProfile />
            </ProtectRouted>
        ),
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
];
