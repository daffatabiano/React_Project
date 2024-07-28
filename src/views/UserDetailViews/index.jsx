import { useEffect, useState } from 'react';
import ProfileCard from '../../components/Fragments/ProfileCard';
import usePostByUserId from '../../hooks/post/usePostbyUserId';
import useAccount from '../../hooks/user/useAccount';
import PostDetailCard from './partials/PostDetailCard';
import './UserDetailViews.css';
import { SendOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearIsShow } from '../../redux/slice/postSlice';
import ModalComment from '../HomeViews/partials/ModalComment';
import useGetPost from '../../hooks/post/useGet';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import usePost from '../../hooks/post/usePost';
import { useParams } from 'react-router-dom';

export default function UserDetailViews(prop) {
    const { getPostByUserId } = usePostByUserId();
    const { getLogUserByID } = useAccount();
    const [isData, setIsData] = useState([]);
    const [isPosts, setIsPosts] = useState([]);
    const isShowDetailPosts = useSelector((state) => state?.post);
    const [isDetailPost, setIsDetailPost] = useState([]);
    const { getDetailPosts } = useGetPost();
    const dispatch = useDispatch();
    const { md } = useBreakpoint();
    const { followPost, unfollowPost } = usePost();
    const [api, contextHolder] = notification.useNotification();
    const [isTextButtonFollow, setIsTextButtonFollow] = useState('follow');
    const params = useParams();

    const getDetail = async () => {
        const res = await getPostByUserId(`${prop?.isId}?size=1000&page=1`);
        setIsPosts(res?.data?.data);
    };

    const getLogUserId = async () => {
        const res = await getLogUserByID(prop?.isId);
        setIsData(res?.data?.data);
    };

    const getPostDetail = async () => {
        const res = await getDetailPosts(isShowDetailPosts?.isId);
        if (res?.status === 200) {
            setIsDetailPost(res?.data?.data);
        }
    };

    const handleFollow = async () => {
        try {
            const body = {
                userIdFollow: params?.id,
            };
            const res = await followPost(body);
            if (res?.status === 200) {
                setIsTextButtonFollow('unfollow');
            } else {
                api['error']({
                    message: 'Error',
                    description: res?.response?.data?.message,
                });
            }
        } catch (err) {
            api['error']({
                message: 'Error',
                description: err?.response?.data?.message,
            });
        }
    };

    const handleUnfollow = async () => {
        try {
            const res = await unfollowPost(params?.id);
            console.log(res);
            if (res?.status === 200) {
                setIsTextButtonFollow('follow');
            } else {
                api['error']({
                    message: 'Error',
                    description: res?.response?.data?.message,
                });
            }
        } catch (err) {
            api['error']({
                message: 'Error',
                description: err?.response?.data?.message,
            });
        }
    };

    useEffect(() => {
        getPostDetail();
    }, [isShowDetailPosts?.isId]);

    useEffect(() => {
        getDetail();
        getLogUserId();
    }, [prop?.isId]);

    const [isLoading, setIsLoading] = useState(false);
    const { commentPost } = usePost();

    const handleComment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const comment = e.target;

        const data = {
            postId: isShowDetailPosts?.isId,
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
                        getPostDetail();
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
                open={isShowDetailPosts?.isShow}
                onClose={() => dispatch(clearIsShow())}
                onCancel={() => dispatch(clearIsShow())}
                width={md && 1000}
                height={md && 500}
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
                                            cursor: isLoading
                                                ? 'not-allowed'
                                                : 'text',
                                        }}
                                        name="comment"
                                        disabled={isLoading}
                                    />
                                    <button
                                        style={{
                                            width: '10%',
                                            cursor: isLoading
                                                ? 'not-allowed'
                                                : 'pointer',
                                        }}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        <SendOutlined />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>,
                ]}
                centered
            >
                <ModalComment {...isDetailPost} api={api} />
            </Modal>
            <div className="user-content-profile">
                <div>
                    <ProfileCard
                        {...isData}
                        totalPosts={isPosts?.totalItems}
                        onFollow={() =>
                            isTextButtonFollow === 'follow'
                                ? handleFollow()
                                : handleUnfollow
                        }
                        buttonFollow={isTextButtonFollow}
                    />
                </div>
                <div>
                    <PostDetailCard {...isPosts} />
                </div>
            </div>
        </>
    );
}
