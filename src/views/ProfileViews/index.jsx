import { useEffect, useState } from 'react';
import PostDetailCard from '../UserDetailViews/partials/PostDetailCard';
import ProfileCardUser from './partials/ProfileCardUser';
import './ProfileViews.css';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [isData, setIsData] = useState([]);
    const { md } = useBreakpoint();
    const { getMyFollowing, getMyFollowers, getPostsByPerson, getDetailPosts } =
        useGetPost();
    const { unfollowPost } = usePost();
    const [isFollowing, setIsFollowing] = useState([]);
    const [isFollowers, setIsFollowers] = useState([]);
    const { getLogUser } = useAccount();
    const [isMyPosts, setIsMyPosts] = useState([]);
    const [isDetailPost, setIsDetailPost] = useState([]);

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

    useEffect(() => {
        handleGetFollowing();
        handleGetFollowers();
    }, []);

    const getPostsProfile = async () => {
        const res = await getPostsByPerson(isData?.id);
        setIsMyPosts(res?.data?.data);
    };

    useEffect(() => {
        getPostsProfile();
    }, [isData?.id]);

    const dispatch = useDispatch();
    const isShowDetailPosts = useSelector((state) => state?.post);

    const getPostDetail = async () => {
        const res = await getDetailPosts(isShowDetailPosts?.isId);
        if (res?.status === 200) {
            setIsDetailPost(res?.data?.data);
        }
    };

    useEffect(() => {
        getPostDetail();
    }, [isShowDetailPosts?.isId]);

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
                centered
            >
                <ModalComment {...isDetailPost} />
            </Modal>
            {contextHolder}
            <ProfileCardUser
                isShowModalFollowers={isShowModalFollowers}
                setIsShowModalFollowers={setIsShowModalFollowers}
                isShowModalFollowing={isShowModalFollowing}
                setIsShowModalFollowing={setIsShowModalFollowing}
                handleUnfollow={handleUnfollow}
                {...isFollowing}
                {...isData}
                {...isMyPosts}
            />
            <div className="profile-posting">
                <PostDetailCard {...isMyPosts} />
            </div>
        </div>
    );
}
