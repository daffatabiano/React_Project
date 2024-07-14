import { useEffect, useState } from 'react';
import ProfileCard from '../../components/Fragments/ProfileCard';
import usePostByUserId from '../../hooks/post/usePostbyUserId';
import useAccount from '../../hooks/user/useAccount';
import Aside from '../../components/Layout/Headers/partials/Aside';
import PostDetailCard from './partials/PostDetailCard';
import './UserDetailViews.css';
import { SendOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearIsShow } from '../../redux/slice/postSlice';
import ModalComment from '../HomeViews/partials/ModalComment';
import useGetPost from '../../hooks/post/useGet';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

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

    const getDetail = async () => {
        const res = await getPostByUserId(`${prop?.isId}?size=10&page=1`);
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

    useEffect(() => {
        getPostDetail();
    }, [isShowDetailPosts?.isId]);

    useEffect(() => {
        getDetail();
        getLogUserId();
    }, [prop?.isId]);

    return (
        <>
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
            <Aside />
            <div className="user-content-profile">
                <div>
                    <ProfileCard {...isData} totalPosts={isPosts?.totalItems} />
                </div>
                <div>
                    <PostDetailCard {...isPosts} />
                </div>
            </div>
        </>
    );
}
