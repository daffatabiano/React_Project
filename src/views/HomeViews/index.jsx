import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import StoryUpdated from '../../components/Fragments/StoryUpdated';
import Postcard from '../../components/Fragments/Cards';
import { useEffect, useState } from 'react';
import './HomeViews.css';
import useGetPost from '../../hooks/post/useGet';
import { SUB_IMAGE } from '../../hooks/service/services';
import { notification, Skeleton } from 'antd';
import SkeletonHomeViews from './SkeletonHomeViews';

export default function HomeViews() {
    const [isPosts, setIsPosts] = useState([]);
    const [isTotalItem, setIsTotalItem] = useState(0);
    const { getPost } = useGetPost();
    const updated = isTotalItem.toString();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const getTotalItems = async () => {
        const res = await getPost('size=10&page=1');
        setIsTotalItem(res?.data?.data?.totalItems);
    };
    useEffect(() => {
        getTotalItems();
    }, []);

    const getDataExplore = async () => {
        await getPost(`size=${updated ? updated : '200'}&page=1`)
            .then((res) => {
                setIsLoading(true);
                if (res?.status === 200) {
                    setIsLoading(false);
                    setIsPosts(res?.data?.data?.posts);
                } else {
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                api['error']({
                    message: 'Error',
                    description: err?.response?.data?.message,
                });
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getDataExplore();
    }, [isTotalItem]);

    console.log(isPosts, 'isPossts');

    return (
        <BaseLayout>
            {contextHolder}
            <div className="home">
                <StoryUpdated {...isPosts} />
                {isPosts?.length === 0 || isLoading ? (
                    <SkeletonHomeViews />
                ) : (
                    isPosts?.map((item) => (
                        <Postcard key={item?.id} {...item} />
                    ))
                )}
            </div>
        </BaseLayout>
    );
}
