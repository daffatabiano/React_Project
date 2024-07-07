import { Avatar, Tooltip } from 'antd';
import './CardPosting.css';
import {
    AntDesignOutlined,
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';

const LikeProfile = () => {
    return (
        <Avatar.Group>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <a href="https://ant.design">
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            </a>
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

export default function Postcard() {
    return (
        <div className="card-posting">
            <div className="head">
                <div className="head-profile">
                    <img
                        src="https://reqres.in/img/faces/10-image.jpg"
                        alt=""
                    />
                    <p>
                        {'John Doe'} <em>•{' 1h'}</em>
                    </p>
                </div>
                <div className="head-action">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="body">
                <img src="https://reqres.in/img/faces/10-image.jpg" alt="" />
            </div>
            <div className="foot">
                <div className="action">
                    <div className="action-item">
                        <button>
                            <i className="bi bi-heart" />
                        </button>
                        <button>
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
                    <LikeProfile />
                    {'1,000 likes'}
                </div>
                <div className="foot-desc">
                    <h6>{'john doe'}</h6>
                    <p>
                        {
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod'
                        }
                    </p>
                </div>
                <div className="comments-total">
                    <em>{'View all 1,000 comments'}</em>
                </div>
                <div className="foot-comment">
                    <input type="text" placeholder="Add a comment..." />
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
