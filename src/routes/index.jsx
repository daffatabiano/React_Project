import PostDetailPerson from '../page/detail-post/[id]';
import EditProfile from '../page/EditProfile';
import Home from '../page/Home';
import Login from '../page/Login';
import UserDetail from '../page/personal-profile/[id]';
import Register from '../page/Register';
import ProtectRouted from './ProtectedRouted';
import Explore from '../page/Explore';
import Post from '../page/post';
import Friends from '../page/friends';
import Notifications from '../page/notifications';
import EditPost from '../page/post/[id]';
import UnderConstructions from '../components/Fragments/Empty';
import Following from '../page/profile/following';
import Profile from '../page/profile';
import Followers from '../page/profile/followers';
import FollowingByPerson from '../page/personal-profile/following';
import FollowersByPerson from '../page/personal-profile/followers';

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
        path: '/personal-profile/followers',
        element: (
            <ProtectRouted>
                <FollowersByPerson />
            </ProtectRouted>
        ),
    },
    {
        path: '/personal-profile/following',
        element: (
            <ProtectRouted>
                <FollowingByPerson />
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
        path: '/profile/following',
        element: (
            <ProtectRouted>
                <Following />
            </ProtectRouted>
        ),
    },
    {
        path: '/profile/followers',
        element: (
            <ProtectRouted>
                <Followers />
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
        children: [
            {
                path: '/post/:id',
                element: (
                    <ProtectRouted>
                        <EditPost />
                    </ProtectRouted>
                ),
            },
        ],
    },
    {
        path: '/friends',
        element: (
            <ProtectRouted>
                <Friends />
            </ProtectRouted>
        ),
    },
    {
        path: '/notifications',
        element: (
            <ProtectRouted>
                <Notifications />
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
        path: '/messages',
        element: (
            <ProtectRouted>
                <UnderConstructions />
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
