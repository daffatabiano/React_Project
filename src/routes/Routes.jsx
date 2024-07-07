import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import ProtectRouted from './ProtectRouted';

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
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
];
