import BaseLayout from '../../components/Layout/Headers/BaseLayout';
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

export default function HomeViews() {
    const [isPosts, setIsPosts] = useState([]);
    const [isTotalItem, setIsTotalItem] = useState(0);
    const { getDetailPosts, getMyFollowingPosts } = useGetPost();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const isShowDetail = useSelector((state) => state?.post);
    const [isDetailPost, setIsDetailPost] = useState([]);
    const istotalFollowing = useSelector(
        (state) => state?.inventory?.user[0]?.totalFollowing
    );

    // GET TOTAL DATA UPDATED

    const getTotalItems = async () => {
        const res = await getMyFollowingPosts('size=10&page=1');
        setIsTotalItem(res?.data?.data?.totalItems);
    };
    useEffect(() => {
        getTotalItems();
    }, []);

    // DATA EXPLORE POSTS FIELDS

    const updated = isTotalItem.toLocaleString();
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
        getDataExplore();
    }, [isTotalItem]);
    useEffect(() => {
        getPostDetail();
    }, [isShowDetail?.isId]);

    const dispatch = useDispatch();
    const { md } = useBreakpoint();
    return (
        <BaseLayout>
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
                    height={'100vh'}
                    extra={
                        <Button
                            type="secondary"
                            onClick={() => dispatch(clearIsShow())}
                        >
                            Close
                        </Button>
                    }
                >
                    <DrawerComment {...isDetailPost} />
                </Drawer>
            )}
            <div className="home">
                {istotalFollowing === 0 && (
                    <div style={{}}>
                        <Empty
                            image="/img/sapiens.svg"
                            imageStyle={{ height: 300 }}
                            description={
                                <Typography.Text style={{ color: 'white' }}>
                                    Connect with your friends and{' '}
                                    <a href="#API">Explore more</a>
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
                            <Button type="primary">Go to Explore</Button>
                        </Empty>
                    </div>
                )}
                {istotalFollowing !== 0 && <StoryUpdated {...[isPosts]} />}
                {istotalFollowing !== 0 &&
                    (isPosts?.length === 0 || isLoading ? (
                        <SkeletonHomeViews />
                    ) : (
                        isPosts?.map((item) => (
                            <Postcard key={item?.id} {...item} />
                        ))
                    ))}
            </div>
        </BaseLayout>
    );
}
