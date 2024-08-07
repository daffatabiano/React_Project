import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './ExploreViews.css';
import useGetPost from '../../hooks/post/useGet';
import { useEffect, useState } from 'react';
import {
    CommentOutlined,
    HeartOutlined,
    SendOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearIsShow, setIsShow } from '../../redux/slice/postSlice';
import ModalComment from '../HomeViews/partials/ModalComment';
import { Modal, notification, Skeleton } from 'antd';
import { SUB_POST_IMAGE } from '../../hooks/service/services';
import ExploreViewsSkeleton from './ExploreViewsSkeleton';
import usePost from '../../hooks/post/usePost';

export default function ExploreViews() {
    const { md } = useBreakpoint();
    const { getExplore, getDetailPosts } = useGetPost();
    const [isExplore, setIsExplore] = useState([]);
    const dispatch = useDispatch();
    const isShowDetail = useSelector((state) => state?.post);
    const [isDetailPost, setIsDetailPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const getExplorePost = async () => {
        const res = await getExplore('size=99999&page=1');
        setIsExplore(res?.data?.data);
    };

    const getPostsDetail = async () => {
        setIsLoading(true);
        const res = await getDetailPosts(isShowDetail?.isId);
        if (res?.status === 200) {
            setIsLoading(false);
            setIsDetailPost(res?.data?.data);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getExplorePost();
    }, []);

    useEffect(() => {
        getPostsDetail();
    }, [isShowDetail?.isId]);

    const { commentPost } = usePost();

    const handleComment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const comment = e.target;

        const data = {
            postId: isShowDetail?.isId,
            comment: comment?.comment?.value,
        };

        if (data?.comment) {
            await commentPost(data).then((res) => {
                if (res?.status === 200) {
                    setIsLoading(false);
                    api['success']({
                        message: 'Success',
                        description: res?.data?.message,
                    });
                    setTimeout(() => {
                        getPostsDetail();
                        data.comment = '';
                    }, 1000);
                } else {
                    setIsLoading(false);
                    api['error']({
                        message: 'Error',
                        description: res?.response?.data?.message,
                    });
                }
            });
        } else {
            setIsLoading(false);
            api['error']({
                message: 'Error',
                description: 'Comment cannot be empty',
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={isShowDetail?.isShow}
                onClose={() => dispatch(clearIsShow())}
                footer={[
                    <>
                        <div className="footer">
                            <div className="action">
                                <div className="action-item">
                                    <button>
                                        <i
                                            className={`bi bi-heart
                                    `}
                                        />
                                    </button>
                                    <button>
                                        <i className="bi bi-send" />
                                    </button>
                                </div>
                                <div className="action-item2">
                                    <button>
                                        <i className="bi bi-bookmark" />
                                    </button>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '50%',
                                    justifyContent: 'end',
                                }}
                                key={isShowDetail?.isId}
                            >
                                <form
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                    }}
                                    onSubmit={handleComment}
                                >
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderBottom: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderTop: '1px solid #222222',
                                            borderRadius: '10px',
                                            outline: 'none',
                                        }}
                                        name="comment"
                                    />
                                    <button
                                        style={{ width: '10%' }}
                                        type="submit"
                                    >
                                        <SendOutlined />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>,
                ]}
                onCancel={() => dispatch(clearIsShow())}
                width={md && 1000}
                centered
                bodyStyle={{
                    maxHeight: '70vh',
                    overflow: 'hidden',
                }}
            >
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <ModalComment {...isDetailPost} api={api} />
                )}
            </Modal>
            <div className="explore">
                {isExplore?.length === 0 && <ExploreViewsSkeleton />}
                {isExplore?.posts?.map((item) => (
                    <div key={item.id} className="explore-img">
                        <img
                            src={
                                item?.imageUrl?.length < 15 ||
                                item?.imageUrl?.includes('fakepath')
                                    ? SUB_POST_IMAGE
                                    : item?.imageUrl
                            }
                            alt={`image of ${
                                item?.user?.username || 'unknown'
                            }`}
                        />
                        <div
                            style={{ display: 'flex' }}
                            className="explore-layout"
                            onClick={() => dispatch(setIsShow(item?.id))}
                        >
                            <HeartOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: md ? '30px' : '20px',
                                }}
                                onClick={() => alert('like')}
                            />
                            <CommentOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: md ? '30px' : '20px',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
