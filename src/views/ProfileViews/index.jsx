import { useEffect, useState } from 'react';
import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import PostDetailCard from '../UserDetailViews/partials/PostDetailCard';
import ProfileCardUser from './partials/ProfileCardUser';
import './ProfileViews.css';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import useGetPost from '../../hooks/post/useGet';
import usePost from '../../hooks/post/usePost';
import useAccount from '../../hooks/user/useAccount';
import useAuth from '../../hooks/auth/useAuth';
import { notification } from 'antd';

export default function ProfileViews() {
    const [api, contextHolder] = notification.useNotification();
    const [isShowModalFollowing, setIsShowModalFollowing] = useState(false);
    const [isShowModalFollowers, setIsShowModalFollowers] = useState(false);
    const navigate = useNavigate();
    const [isData, setIsData] = useState([]);
    const { md } = useBreakpoint();
    const { getMyFollowing, getMyFollowers } = useGetPost();
    const { unfollowPost } = usePost();
    const [isFollowing, setIsFollowing] = useState([]);
    const [isFollowers, setIsFollowers] = useState([]);
    const { getLogUser } = useAccount();
    const { authLogout } = useAuth();
    const token = localStorage.getItem('token');

    const getLogUserData = async () => {
        const res = await getLogUser('user');
        setIsData(res?.data?.data);
    };
    useEffect(() => {
        getLogUserData();
    }, []);

    const handleGetFollowing = async () => {
        const res = await getMyFollowing('size=9999&page=1');
        if (res?.status === 200) {
            setIsFollowing(res?.data?.data);
        }
    };
    const handleGetFollowers = async () => {
        const res = await getMyFollowers('size=9999&page=1');
        setIsFollowers(res?.data?.data);
    };

    const handleUnfollow = async (id) => {
        const res = await unfollowPost(id);
        if (res?.status === 200) {
            handleGetFollowing();
        }
    };

    const handleLogout = async () => {
        const res = await authLogout(token);
        if (res?.status === 200) {
            api['success'] = {
                message: 'Logout success',
                description: res?.data?.message,
            };
            navigate('/login');
        } else {
            api['error'] = {
                message: 'Logout Failed',
                description: res?.response?.data?.message,
            };
        }
    };

    useEffect(() => {
        handleGetFollowing();
        handleGetFollowers();
    }, []);

    return (
        <div className="profile">
            {contextHolder}
            <ProfileCardUser
                isShowModalFollowers={isShowModalFollowers}
                setIsShowModalFollowers={setIsShowModalFollowers}
                isShowModalFollowing={isShowModalFollowing}
                setIsShowModalFollowing={setIsShowModalFollowing}
                handleUnfollow={handleUnfollow}
                itemsDropDown
                {...isData}
            />
            <div className="profile-posting">
                <PostDetailCard />
            </div>
        </div>
    );
}
