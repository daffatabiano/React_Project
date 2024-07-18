import { Avatar, Popover, Tooltip, Tour } from 'antd';
import './CardPosting.css';
import {
    AntDesignOutlined,
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    BASE_URL,
    SUB_IMAGE,
    SUB_POST_IMAGE,
} from '../../../hooks/service/services';
import { useDispatch } from 'react-redux';
import { setIsShow } from '../../../redux/slice/postSlice';
import usePost from '../../../hooks/post/usePost';
import { useRef, useState } from 'react';
import usePostByUserId from '../../../hooks/post/usePostbyUserId';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Link } from 'react-router-dom';

const LikeProfile = () => {
    return (
        <Avatar.Group size={16}>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            <Tooltip title="Ant User" placement="top">
                <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                />
            </Tooltip>
            <Avatar
                style={{ backgroundColor: '#1677ff' }}
                icon={<AntDesignOutlined />}
            />
        </Avatar.Group>
    );
};

export default function Postcard(prop) {
    console.log(prop);
    const apiCreatedAt = prop?.createdAt?.split('T')[0];

    const apiDate = new Date(apiCreatedAt);
    const date = new Date();
    const diffMlsec = date - apiDate;
    const diffDay = Math.floor(diffMlsec / (1000 * 60 * 60 * 24));
    let result = '';
    if (diffDay > 30) {
        result = Math.floor(diffDay / 30) + ' month ago';
        const month = Math.floor(diffDay / 30);
        if (month > 12) {
            result = Math.floor(diffDay / 30 / 12) + ' year ago';
        }
    } else if (diffDay > 7) {
        result = Math.floor(diffDay / 7) + ' week ago';
    } else if (diffDay) {
        result = Math.floor(diffDay) + ' day ago';
    } else if (diffDay * 24 > 24) {
        result = Math.floor((diffDay * 24) / 24) + ' hour ago';
    } else {
        result = Math.floor((diffDay * 24 * 60) / 60) + ' minute ago';
    }

    const dispatch = useDispatch();
    const [isLike, seIsLike] = useState(false);
    const { likePost } = usePost();
    const { getPostByUserId } = usePostByUserId();
    const [isLoading, setIsLoading] = useState(false);

    const { md } = useBreakpoint();

    // const handleLike = async (id) => {
    //     const body = {
    //         postId: id,
    //     };
    //     const res = await likePost(body);
    //     if (res?.status === 200) {
    //         seIsLike(!isLike);
    //     }
    //     console.log(res);
    //     // dispatch(setIsLike({ isId: id, isLike: res?.data?.isLike }));
    // };
    const [isOpen, setIsOpen] = useState(false);
    const ref1 = useRef(null);
    const steps = [
        {
            cover: (
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'flex-start',
                    }}
                >
                    <img
                        alt="tour.png"
                        src={
                            'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
                        }
                        style={{
                            width: '65px',
                            height: '65px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                    <p
                        style={{
                            fontSize: '20px',
                            fontWeight: '400',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {'JohnDoe'}
                        <span
                            style={{
                                fontSize: '10px',
                                fontStyle: 'italic',
                                fontWeight: '200',
                            }}
                        >
                            {'@johndoe'}
                        </span>
                    </p>
                </div>
            ),
            target: () => ref1.current,
            nextButtonProps: {
                children: (
                    <Link
                        to={`/personal-profile/${prop?.user?.id}`}
                        style={{
                            width: '100px',
                            backgroundColor: 'var(--primary)',
                        }}
                    >
                        Visit
                    </Link>
                ),
            },
        },
    ];

    return (
        <div className="card-posting">
            <div className="head">
                <Tour
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    steps={steps}
                    arrow
                    mask={false}
                />
                <div
                    onClick={() => setIsOpen(true)}
                    style={{ cursor: 'pointer' }}
                    className="head-profile"
                >
                    <img
                        src={prop?.user?.profilePictureUrl || SUB_IMAGE}
                        alt={`${prop?.user?.username} profile picture`}
                    />
                    <p>
                        {prop?.user?.username || 'unknown'}{' '}
                        <em>•{' ' + result}</em>
                    </p>
                </div>
                <div className="head-action">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="body">
                <img
                    src={
                        prop?.imageUrl?.length < 20 ||
                        prop?.imageUrl?.includes('fakepath')
                            ? SUB_POST_IMAGE
                            : prop?.imageUrl
                    }
                    alt=""
                />
            </div>
            <div className="foot">
                <div className="action">
                    <div className="action-item">
                        <button>
                            <i
                                className={`bi bi-${
                                    isLike ? 'heart-fill' : 'heart'
                                }`}
                            />
                        </button>
                        <button onClick={() => dispatch(setIsShow(prop?.id))}>
                            <i className="bi bi-chat" />
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
                <div className="likes-total">
                    {prop?.totalLikes > 0 ? <LikeProfile /> : null}
                    {`${prop?.totalLikes || 0} likes`}
                </div>
                <div className="foot-desc">
                    <h6>
                        {`${prop?.user?.username || 'unknown'}`}{' '}
                        <span>{prop?.caption}</span>
                    </h6>
                </div>
                <div
                    className="comments-total"
                    onClick={() => dispatch(setIsShow(prop?.id))}
                >
                    <em>{'View all comments'}</em>
                </div>
                <div className="foot-comment">
                    <input
                        onClick={() => dispatch(setIsShow(prop?.id))}
                        type="text"
                        placeholder="Add a comment..."
                    />
                    <button>
                        <SendOutlined
                            style={{ color: 'white', fontSize: '20px' }}
                        />
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
}
