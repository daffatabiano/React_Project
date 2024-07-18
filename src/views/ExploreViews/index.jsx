import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import BaseLayout from '../../components/Layout/Headers/BaseLayout';
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
import { Col, Modal, notification, Row, Skeleton } from 'antd';
import SkeletonImage from 'antd/es/skeleton/Image';
import { SUB_POST_IMAGE } from '../../hooks/service/services';

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
        console.log(res);
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

    const [randomWidth, setRandomWidth] = useState(
        Math.floor(Math.random() * 3) + 1
    );
    const [randomHeight, setRandomHeight] = useState(
        Math.floor(Math.random() * 4) + 1
    );

    console.log(isExplore, 'isExplore');

    return (
        <>
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
                                    // onSubmit={handleComment}
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
                bodyStyle={{ maxHeight: '70vh' }}
            >
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <ModalComment {...isDetailPost} api={api} />
                )}
            </Modal>
            <BaseLayout>
                <div className="explore">
                    {isExplore?.length === 0 && (
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                                <SkeletonImage
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        marginRight: '15px',
                                    }}
                                />
                            </Col>
                        </Row>
                    )}
                    {isExplore?.posts?.map((item) => (
                        <div
                            key={item.id}
                            className="explore-img"
                            // style={{
                            //     gridColumn: `span ${randomWidth}`,
                            //     gridRow: `span ${randomHeight}`,
                            // }}
                        >
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
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => alert('like')}
                                />
                                <CommentOutlined
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </BaseLayout>
        </>
    );
}
