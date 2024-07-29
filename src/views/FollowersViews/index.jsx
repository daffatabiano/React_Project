import { useEffect, useState } from 'react';
import FollowLayouts from '../../components/Layout/Headers/FollowLayout';
import useGetPost from '../../hooks/post/useGet';
import { SUB_IMAGE } from '../../hooks/service/services';
import { notification } from 'antd';

export default function FollowersViews() {
    const { getMyFollowers } = useGetPost();
    const [isFollowers, setIsFollowers] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const handleGetFollowers = async () => {
        const res = await getMyFollowers('size=9999&page=1');
        if (res?.status === 200) {
            setIsFollowers(res?.data?.data);
        }
    };
    useEffect(() => {
        handleGetFollowers();
    }, []);

    return (
        <>
            {contextHolder}
            <FollowLayouts
                title={'Followers'}
                image={SUB_IMAGE}
                {...[isFollowers.users]}
                username="jojon doe"
                api={api}
            />
        </>
    );
}
