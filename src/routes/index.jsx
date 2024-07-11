import { Skeleton } from 'antd';
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
        path: 'testing',
        element: (
            <div
                style={{ padding: '20px', backgroundColor: 'var(--skeleton)' }}
            >
                <Skeleton
                    avatar
                    active
                    size="large"
                    block
                    shape="circle"
                    paragraph={{ rows: 0 }}
                />
                <Skeleton.Image
                    active
                    style={{
                        width: '400px',
                        height: '400px',
                        marginBottom: '20px',
                    }}
                />
                <Skeleton active paragraph={{ rows: 3 }} />
            </div>
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
