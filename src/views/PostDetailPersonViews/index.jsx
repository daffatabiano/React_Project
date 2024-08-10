import { useLocation, useNavigate } from 'react-router-dom';
import Postcard from '../../components/Fragments/Cards';
import { useEffect, useState } from 'react';
import useGetPost from '../../hooks/post/useGet';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { notification } from 'antd';
import usePost from '../../hooks/post/usePost';
import { useDispatch, useSelector } from 'react-redux';
import { setIsId } from '../../redux/slice/postSlice';

export default function PostDetailPersonViews() {
    const location = useLocation();
    const p = location?.pathname;
    const isId = p?.split('/')[2];
    const { getDetailPosts } = useGetPost();
    const [isPosts, setIsPosts] = useState([]);
    const navigate = useNavigate();

    const getDetail = async () => {
        const res = await getDetailPosts(isId);
        setIsPosts(res?.data?.data);
    };

    useEffect(() => {
        getDetail();
    }, [isId]);

    const { md } = useBreakpoint();
    const [api, contextHolder] = notification.useNotification();
    const { likePost } = usePost();
    const isPostDetailMatch = useSelector((state) => state.post);
    const handleLike = async (e) => {
        const res = await likePost(
            e.id === isPostDetailMatch.isId ? 'unlike' : 'like',
            {
                postId: e.id,
            }
        );
        if (res?.status === 200) {
            api['success']({
                message: 'Success',
                description: res?.data?.message,
            });
            setTimeout(() => {
                dispatch(setIsId(''));
                navigate(0);
            }, 500);
        } else {
            api['error']({
                message: 'Error',
                description: res?.response?.data?.message,
            });
        }
    };
    const dispatch = useDispatch();

    const { getPostsByPerson } = useGetPost();
    const [isMyPosts, setIsMyPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const getPostsProfile = async () => {
        setIsLoading(true);
        const res = await getPostsByPerson(isPosts?.userId);
        setIsMyPosts(res?.data?.data);
        if (res?.status === 200) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPostsProfile();
    }, []);

    return (
        <>
            {contextHolder}
            {!md ? (
                <div style={{ padding: '24px' }}>
                    <Postcard
                        {...isPosts}
                        onLike={() => {
                            handleLike(isPosts);
                            dispatch(setIsId(isPosts?.id));
                        }}
                    />
                </div>
            ) : (
                navigate('/')
            )}
        </>
    );
}
