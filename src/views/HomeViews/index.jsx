import StoryUpdated from '../../components/Fragments/StoryUpdated';
import Postcard from '../../components/Fragments/Cards';
import { useEffect, useState } from 'react';
import './HomeViews.css';
import useGetPost from '../../hooks/post/useGet';
import {
    Button,
    Drawer,
    Empty,
    Modal,
    notification,
    Skeleton,
    Typography,
} from 'antd';
import SkeletonHomeViews from './partials/SkeletonHomeViews';
import { useDispatch, useSelector } from 'react-redux';
import ModalComment from './partials/ModalComment';
import { clearIsShow } from '../../redux/slice/postSlice';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { SendOutlined } from '@ant-design/icons';
import DrawerComment from './partials/DrawerComment';
import usePost from '../../hooks/post/usePost';
import { Link, useNavigate } from 'react-router-dom';
import { SUB_EMPTY_DATA } from '../../hooks/service/services';
import useAccount from '../../hooks/user/useAccount';
import FootSide from '../../components/Layout/Headers/partials/FootSide.jsx';

export default function HomeViews() {
    const [isPosts, setIsPosts] = useState([]);
    const [isTotalItem, setIsTotalItem] = useState(0);
    const { getDetailPosts, getMyFollowingPosts, getPostsByPerson } =
        useGetPost();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const isShowDetail = useSelector((state) => state?.post);
    const [isDetailPost, setIsDetailPost] = useState([]);
    const navigate = useNavigate();
    const { getLogUser } = useAccount();
    const [istotalFollowing, setIstotalFollowing] = useState(0);
    const [isProfileData, setIsProfileData] = useState([]);

    const getData = async () => {
        const res = await getLogUser('user');
        setIstotalFollowing(res?.data?.data?.totalFollowing);
        setIsProfileData(res?.data?.data);
    };

    // GET TOTAL DATA UPDATED

    const getTotalItems = async () => {
        const res = await getMyFollowingPosts('size=10&page=1');
        setIsTotalItem(res?.data?.data?.totalItems);
    };

    useEffect(() => {
        getTotalItems();
    }, []);
    const updated = isTotalItem.toString();

    // DATA EXPLORE POSTS FIELDS

    const getDataExplore = async () => {
        await getMyFollowingPosts(`size=${updated ? updated : '200'}&page=1`)
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

    const getPostDetail = async () => {
        const res = await getDetailPosts(isShowDetail?.isId);
        if (res?.status === 200) {
            setIsDetailPost(res?.data?.data);
        }
    };

    // COMMENTS FEATURES FIELDS
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

    // USE EFFECT FIELDS

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getDataExplore();
    }, [isTotalItem]);

    useEffect(() => {
        if (isShowDetail?.isShow) getPostDetail();
    }, [isShowDetail?.isId]);

    const [isData, setIsData] = useState([]);

    const getUser = async () => {
        await getLogUser('user')
            .then((res) => {
                setIsData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    const [isMyPost, setIsMyPost] = useState([]);
    const getOwnMypost = async () => {
        const res = await getPostsByPerson(isData?.id);
        setIsMyPost(res?.data?.data);
    };

    useEffect(() => {
        getOwnMypost();
    }, [isData?.id]);

    const dispatch = useDispatch();
    const { md } = useBreakpoint();
    const { likePost } = usePost();

    const handleLike = async (e) => {
        console.log(e, 'event handle like dinner');
        const res = await likePost(e?.isLike ? 'unlike' : 'like', {
            postId: e.id,
        });
        if (res?.status === 200) {
            getDataExplore();
            getOwnMypost();
            api['success']({
                message: 'Success',
                description: res?.data?.message,
            });
        } else {
            api['error']({
                message: 'Error',
                description: res?.response?.data?.message,
            });
        }
    };
    return (
        <>
            {contextHolder}
            {md ? (
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
                    height={md && 500}
                    centered
                >
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <ModalComment {...isDetailPost} api={api} />
                    )}
                </Modal>
            ) : (
                <Drawer
                    title="Comments"
                    placement={'bottom'}
                    closable={false}
                    open={isShowDetail?.isShow}
                    onClose={() => dispatch(clearIsShow())}
                    style={{
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        padding: '0px',
                    }}
                    height={'85vh'}
                    extra={
                        <Button
                            type="secondary"
                            onClick={() => dispatch(clearIsShow())}
                        >
                            Close
                        </Button>
                    }
                >
                    <DrawerComment
                        {...isDetailPost}
                        {...isMyPost}
                        {...isPosts}
                    />
                </Drawer>
            )}
            <div className="home">
                {istotalFollowing === 0 && isMyPost?.totalItems === 0 && (
                    <div style={{}}>
                        <Empty
                            image={'/img/sapiens.svg' || SUB_EMPTY_DATA}
                            imageStyle={{ height: 300 }}
                            description={
                                <Typography.Text style={{ color: 'white' }}>
                                    Connect with your friends and{' '}
                                    <Link to="/explore">Explore more</Link>
                                </Typography.Text>
                            }
                            style={{
                                height: '80vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Button
                                type="primary"
                                onClick={() => navigate('/explore')}
                            >
                                Go to Explore
                            </Button>
                        </Empty>
                    </div>
                )}
                {istotalFollowing !== 0 && <StoryUpdated {...[isPosts]} />}
                {(isMyPost?.length === 0 && isPosts?.length === 0) ||
                isLoading ? (
                    <SkeletonHomeViews />
                ) : (
                    <>
                        {isMyPost?.posts?.map((item) => (
                            <Postcard
                                key={item?.id}
                                {...item}
                                onLike={() => handleLike(item)}
                            />
                        ))}
                        {isPosts?.map((item) => (
                            <Postcard
                                key={item?.id}
                                {...item}
                                onLike={() => handleLike(item)}
                            />
                        ))}
                    </>
                )}
            </div>
            <FootSide {...isData} />
        </>
    );
}
