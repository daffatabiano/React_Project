import { useEffect, useState } from 'react';
import PostDetailCard from '../UserDetailViews/partials/PostDetailCard';
import ProfileCardUser from './partials/ProfileCardUser';
import './ProfileViews.css';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import useGetPost from '../../hooks/post/useGet';
import usePost from '../../hooks/post/usePost';
import useAccount from '../../hooks/user/useAccount';
import { Modal, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { clearIsShow } from '../../redux/slice/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalComment from '../HomeViews/partials/ModalComment';

export default function ProfileViews() {
    const [api, contextHolder] = notification.useNotification();
    const [isShowModalFollowing, setIsShowModalFollowing] = useState(false);
    const [isShowModalFollowers, setIsShowModalFollowers] = useState(false);
    const [isData, setIsData] = useState([]);
    const { md } = useBreakpoint();
    const { getMyFollowing, getMyFollowers, getPostsByPerson, getDetailPosts } =
        useGetPost();
    const [isFollowing, setIsFollowing] = useState([]);
    const [isFollowers, setIsFollowers] = useState([]);
    const { getLogUser } = useAccount();
    const [isMyPosts, setIsMyPosts] = useState([]);
    const [isDetailPost, setIsDetailPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getLogUserData = async () => {
        setIsLoading(true);
        const res = await getLogUser('user');
        setIsData(res?.data?.data);
        if (res?.status === 200) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getLogUserData();
    }, []);

    const handleGetFollowing = async () => {
        setIsLoading(true);
        const res = await getMyFollowing('size=9999&page=1');
        if (res?.status === 200) {
            setIsFollowing(res?.data?.data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    const handleGetFollowers = async () => {
        setIsLoading(true);
        const res = await getMyFollowers('size=9999&page=1');
        setIsFollowers(res?.data?.data);
        if (res?.status === 200) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetFollowing();
        handleGetFollowers();
    }, []);

    const getPostsProfile = async () => {
        setIsLoading(true);
        const res = await getPostsByPerson(isData?.id);
        setIsMyPosts(res?.data?.data);
        if (res?.status === 200) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPostsProfile();
    }, [isData?.id]);

    const dispatch = useDispatch();
    const isShowDetailPosts = useSelector((state) => state?.post);

    const getPostDetail = async () => {
        setIsLoading(true);
        const res = await getDetailPosts(isShowDetailPosts?.isId);
        if (res?.status === 200) {
            setIsDetailPost(res?.data?.data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPostDetail();
    }, [isShowDetailPosts?.isId]);

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
    const itemFollow = [
        {
            id: 1,
            name: 'Following',
            setIsShowModalFollowing: isShowModalFollowing,
            clickToOpen: () => setIsShowModalFollowing(!isShowModalFollowing),
            item: isFollowing,
        },
        {
            id: 2,
            name: 'Followers',
            setIsShowModalFollowers: isShowModalFollowers,
            clickToOpen: () => setIsShowModalFollowers(!isShowModalFollowers),
            item: isFollowers,
        },
    ];

    return (
        <div className="profile">
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
                                        }}
                                        name="comment"
                                        disabled={isLoading}
                                    />
                                    <button
                                        style={{ width: '10%' }}
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
            {contextHolder}
            <ProfileCardUser
                isLoading={isLoading}
                {...itemFollow}
                {...isData}
                {...isMyPosts}
            />
            <div className="profile-posting">
                <PostDetailCard isLoading={isLoading} {...isMyPosts} />
            </div>
        </div>
    );
}
