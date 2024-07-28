import { EllipsisOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function ProfileCard(prop) {
    return (
        <div className="profile-card">
            <div className="card-img">
                <img src={prop?.profilePictureUrl} alt="" />
            </div>
            <div className="card-info">
                <div className="info-title">
                    <p>{prop?.name}</p>
                    <Button onClick={prop?.onFollow}>
                        {prop?.buttonFollow}
                    </Button>
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
