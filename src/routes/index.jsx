import PostDetailPerson from '../page/detail-post/[id]';
import EditProfile from '../page/EditProfile';
import Home from '../page/Home';
import Login from '../page/Login';
import Profile from '../page/Profile';
import UserDetail from '../page/personal-profile/[id]';
import Register from '../page/Register';
import ProtectRouted from './ProtectedRouted';
import Explore from '../page/Explore';
import Post from '../page/post';

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
        path: '/personal-profile',
        children: [
            {
                path: '/personal-profile/:id',
                element: (
                    <ProtectRouted>
                        <UserDetail />
                    </ProtectRouted>
                ),
            },
        ],
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
        path: '/post',
        element: (
            <ProtectRouted>
                <Post />
            </ProtectRouted>
        ),
    },
    {
        path: '/personal-post-detail',
        children: [
            {
                path: '/personal-post-detail/:id',
                element: (
                    <ProtectRouted>
                        <PostDetailPerson />
                    </ProtectRouted>
                ),
            },
        ],
    },
    {
        path: '/explore',
        element: (
            <ProtectRouted>
                <Explore />
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
