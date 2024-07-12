import { Avatar, Tooltip } from 'antd';
import './CardPosting.css';
import {
    AntDesignOutlined,
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { SUB_IMAGE, SUB_POST_IMAGE } from '../../../hooks/service/services';
import { useDispatch } from 'react-redux';
import { setIsShow } from '../../../redux/slice/postSlice';

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

    return (
        <div className="card-posting">
            <div className="head">
                <div className="head-profile">
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
                                    prop?.isLike ? 'heart-fill' : 'heart'
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
