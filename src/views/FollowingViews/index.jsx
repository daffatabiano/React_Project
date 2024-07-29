import { useEffect, useState } from 'react';
import FollowLayouts from '../../components/Layout/Headers/FollowLayout';
import useGetPost from '../../hooks/post/useGet';
import { SUB_IMAGE } from '../../hooks/service/services';
import { notification } from 'antd';

export default function FollowingViews() {
    const { getMyFollowing } = useGetPost();
    const [isFollowing, setIsFollowing] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const handleGetFollowing = async () => {
        const res = await getMyFollowing('size=9999&page=1');
        if (res?.status === 200) {
            setIsFollowing(res?.data?.data);
        }
    };
    useEffect(() => {
        handleGetFollowing();
    }, []);

    return (
        <>
            {contextHolder}
            <FollowLayouts
                title={'Following'}
                image={SUB_IMAGE}
                {...[isFollowing.users]}
                api={api}
            />
        </>
    );
}
