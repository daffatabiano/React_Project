import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import StoryUpdated from '../../components/Fragments/StoryUpdated';
import Postcard from '../../components/Fragments/Cards';
import { useEffect, useState } from 'react';
import './HomeViews.css';
import useGetPost from '../../hooks/post/useGet';
import { Drawer, Modal, notification } from 'antd';
import SkeletonHomeViews from './partials/SkeletonHomeViews';
import { useDispatch, useSelector } from 'react-redux';
import ModalComment from './partials/ModalComment';
import { clearIsShow } from '../../redux/slice/postSlice';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { SendOutlined } from '@ant-design/icons';

export default function HomeViews() {
    const [isPosts, setIsPosts] = useState([]);
    const [isTotalItem, setIsTotalItem] = useState(0);
    const { getPost, getDetailPosts } = useGetPost();
    const updated = isTotalItem.toString();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const isShowDetail = useSelector((state) => state?.post);
    const [isDetailPost, setIsDetailPost] = useState([]);

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

    const getPostDetail = async () => {
        const res = await getDetailPosts(isShowDetail?.isId);
        if (res?.status === 200) {
            setIsDetailPost(res?.data?.data);
        }
    };

    useEffect(() => {
        getDataExplore();
    }, [isTotalItem]);
    useEffect(() => {
        getPostDetail();
    }, [isShowDetail?.isId]);
    console.log(isDetailPost);

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
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderBottom: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderTop:
                                                '1px solid rgb(255, 255, 255, 0.5)',
                                            outline: 'none',
                                        }}
                                    />
                                    <button style={{ width: '10%' }}>
                                        <SendOutlined />
                                    </button>
                                </div>
                            </div>
                        </>,
                    ]}
                    onCancel={() => dispatch(clearIsShow())}
                    width={md && 1000}
                    height={md && 500}
                    centered
                >
                    <ModalComment {...isDetailPost} />
                </Modal>
            ) : (
                <Drawer
                    title="Basic Drawer"
                    placement={'bottom'}
                    closable={false}
                    open={isShowDetail?.isShow}
                    onClose={() => dispatch(clearIsShow())}
                    style={{
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                    }}
                    height={600}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            )}
            <div className="home">
                <StoryUpdated {...[isPosts]} />
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
