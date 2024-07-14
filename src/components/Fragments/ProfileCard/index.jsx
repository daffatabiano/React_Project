import { EllipsisOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

export default function ProfileCard(prop) {
    const items = [
        {
            key: '1',
            label: (
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '15px',
                        padding: 0,
                    }}
                    onClick={prop?.onFollow}
                >
                    Follow
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: '15px',
                        padding: 0,
                    }}
                >
                    Unfollow
                </p>
            ),
        },
    ];
    return (
        <div className="profile-card">
            <div className="card-img">
                <img src={prop?.profilePictureUrl} alt="" />
            </div>
            <div className="card-info">
                <div className="info-title">
                    <p>{prop?.name}</p>
                    <Dropdown
                        trigger={['click']}
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        <Button>Follow</Button>
                    </Dropdown>
                    <button>
                        <UserAddOutlined />
                    </button>
                    <EllipsisOutlined />
                </div>
                <div className="info-content">
                    <p>
                        <span>{prop?.totalPosts}</span> Post
                    </p>
                    <p>
                        <span>{prop?.totalFollowers}</span> Followers
                    </p>
                    <p>
                        <span>{prop?.totalFollowing}</span> Following
                    </p>
                </div>
                <div className="info-desc">
                    <h6>{prop?.username}</h6>
                    <p>{prop?.bio}</p>
                    <Link
                        to={
                            prop?.website?.includes('http' || 'https')
                                ? prop?.website
                                : `https://${prop?.website}`
                        }
                    >
                        {prop?.website}
                    </Link>
                </div>
            </div>
        </div>
    );
}
