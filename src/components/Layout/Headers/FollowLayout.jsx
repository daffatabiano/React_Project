import './FollowLayout.css';
import { SUB_IMAGE } from '../../../hooks/service/services';
import { Link, useNavigate } from 'react-router-dom';
import usePost from '../../../hooks/post/usePost';
export default function FollowLayouts(prop) {
    const navigate = useNavigate();
    const { unfollowPost } = usePost();
    const handleUnfollow = async (id) => {
        const res = await unfollowPost(id);
        if (res.status === 200) {
            prop.api['success']({
                message: 'unfollow success',
                description: res?.data?.message,
            });
            navigate(0);
        } else {
            prop.api['error']({
                message: 'unfollow unsuccess',
                description: res?.responses?.data?.message,
            });
        }
    };
    return (
        <div className="follow">
            <h1>{prop?.title}</h1>
            <div className="follow-card">
                {prop[0]?.length === 0 && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px',
                        }}
                    >
                        <h6 style={{ padding: 24, color: 'black' }}>
                            You don&apos;t have following.
                        </h6>
                        <p style={{ fontWeight: 200, padding: ' 0 24px ' }}>
                            Got some friends at there!
                        </p>
                        <Link
                            style={{
                                padding: '10px 12px',
                                backgroundColor: 'transparent',
                                border: '1px solid #ffff',
                                borderRadius: '10px',
                                textAlign: 'center',
                            }}
                            to={'/explore'}
                        >
                            Go to Explore
                        </Link>
                    </div>
                )}
                {prop[0]?.map((item) => (
                    <div key={item.id} className="follow-card-content">
                        <div className="follow-card-content-img">
                            <img
                                src={item?.profilePictureUrl || SUB_IMAGE}
                                alt=""
                            />
                            <p>{item?.username}</p>
                        </div>
                        <div className="follow-card-content-action">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate('/personal-profile/' + item.id)
                                }
                            >
                                Visit
                            </button>
                            <button
                                type="button"
                                style={{ color: 'red' }}
                                onClick={() => handleUnfollow(item.id)}
                            >
                                Unfollow
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
