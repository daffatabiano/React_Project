import PostDetailPerson from '../page/detail-post/[id]';
import EditProfile from '../page/EditProfile';
import Home from '../page/Home';
import Login from '../page/Login';
import Profile from '../page/Profile';
import UserDetail from '../page/personal-profile/[id]';
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
        path: '/personal-profile/:id',
        element: (
            <ProtectRouted>
                <UserDetail />
            </ProtectRouted>
        ),
    },
    {
        path: '/personal-post-detail/:id',
        element: (
            <ProtectRouted>
                <PostDetailPerson />
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
