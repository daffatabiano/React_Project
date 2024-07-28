import { SettingOutlined } from '@ant-design/icons';
import './ProfileCardUser.css';
import { Divider, Dropdown, Modal, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import useAuth from '../../../../hooks/auth/useAuth';
import usePost from '../../../../hooks/post/usePost';

export default function ProfileCardUser(prop) {
    const { md } = useBreakpoint();
    const navigate = useNavigate();
    const { unfollowPost } = usePost();

    const { authLogout } = useAuth();
    const token = localStorage.getItem('token');
    const [api, contextHolder] = notification.useNotification();

    const handleUnfollow = async (id) => {
        const res = await unfollowPost(id);
        if (res?.status === 200) {
            api['success']({
                message: 'Unfollow Success',
                description: res?.data?.message,
            });
        } else {
            api['error']({
                message: 'Unfollow Failed',
                description: res?.response?.data?.message,
            });
        }
    };

    const handleLogout = async () => {
        await authLogout(token).then((res) => {
            if (res?.status === 200) {
                api['success']({
                    message: 'Logout Success',
                    description: res?.data?.message,
                });
                setTimeout(() => {
                    localStorage.clear();
                    localStorage.removeItem('token');
                    window.location.reload();
                }, 2000);
            } else {
                api['error']({
                    message: 'Logout Failed',
                    description: res?.response?.data?.message,
                });
            }
        });
    };

    return (
        <div>
            {contextHolder}
            {md ? (
                <Modal
                    footer={null}
                    title="Followers"
                    centered
                    open={prop?.isShowModalFollowers}
                    onOk={() => prop?.setIsShowModalFollowers(false)}
                    onCancel={() => prop?.setIsShowModalFollowers(false)}
                    width={500}
                    style={{
                        maxHeight: '80vh',
                    }}
                    bodyStyle={{
                        maxHeight: '65vh',
                        minHeight: '60vh',
                        overflow: 'auto',
                        padding: '10px',
                        backgroundColor: 'transparent',
                        color: '#0101010',
                    }}
                >
                    {prop[1]?.length === 0 ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <p
                                style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                No following
                            </p>
                        </div>
                    ) : (
                        prop[1]?.map((item) => (
                            <div key={item?.id}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '15px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: 50,
                                                height: 50,
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                objectPosition: 'center',
                                            }}
                                            src={item?.profilePictureUrl}
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: 'bold',
                                                color: 'black',
                                            }}
                                        >
                                            {item?.username}
                                        </p>
                                    </div>
                                    <button
                                        style={{
                                            color: 'white',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        visit
                                    </button>
                                </div>
                                <Divider />
                            </div>
                        ))
                    )}
                </Modal>
            ) : null}
            {md ? (
                <Modal
                    title="Following"
                    centered
                    open={prop?.isShowModalFollowing}
                    onOk={() => prop?.setIsShowModalFollowing(false)}
                    onCancel={() => prop?.setIsShowModalFollowing(false)}
                    onClose={() => prop?.setIsShowModalFollowing(false)}
                    width={500}
                    footer={null}
                    style={{
                        height: '80vh',
                    }}
                    bodyStyle={{
                        maxHeight: '65vh',
                        minHeight: '60vh',
                        overflow: 'auto',
                        padding: '10px',
                        backgroundColor: 'transparent',
                        color: '#0101010',
                    }}
                >
                    {prop[0]?.length === 0 ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <p
                                style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                No following
                            </p>
                        </div>
                    ) : (
                        prop[0]?.map((item) => (
                            <div key={item?.id}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '15px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: 50,
                                                height: 50,
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                objectPosition: 'center',
                                            }}
                                            src={item?.profilePictureUrl}
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: 'bold',
                                                color: 'black',
                                            }}
                                        >
                                            {item?.username}
                                        </p>
                                    </div>
                                    <button
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            borderRadius: '10px',
                                        }}
                                        // type="button"
                                        onClick={() => handleUnfollow(item?.id)}
                                    >
                                        Unfollow
                                    </button>
                                </div>
                                <Divider />
                            </div>
                        ))
                    )}
                </Modal>
            ) : null}
            <div className="profile-card">
                <div className="card-img">
                    <img src={prop?.profilePictureUrl} alt="" />
                </div>
                <div className="card-info">
                    <div className="info-title">
                        <p>{prop?.name}</p>
                        <button
                            type="button"
                            onClick={() => navigate('/edit-profile')}
                        >
                            Edit profile
                        </button>
                        <button>View archive</button>
                        <Dropdown
                            trigger={['click', 'hover']}
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: (
                                            <button
                                                style={{
                                                    width: '100%',
                                                    backgroundColor:
                                                        'transparent',
                                                    color: 'red',
                                                }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        ),
                                    },
                                ],
                            }}
                            arrow={{ pointAtCenter: true }}
                        >
                            <SettingOutlined />
                        </Dropdown>
                    </div>
                    <div className="info-content">
                        <p>
                            <span>{prop?.posts?.length || 0}</span> Post
                        </p>
                        <p
                            onClick={() =>
                                md
                                    ? prop?.setIsShowModalFollowers(true)
                                    : navigate('/profile/followers')
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{prop?.totalFollowers || 0}</span> Followers
                        </p>
                        <p
                            onClick={() =>
                                md
                                    ? prop?.setIsShowModalFollowing(true)
                                    : navigate('/profile/following')
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{prop?.totalFollowing || 0}</span> Following
                        </p>
                    </div>
                    <div className="info-desc">
                        <h6>{prop?.username}</h6>
                        <p>{prop?.bio}</p>
                        <Link
                            to={`${
                                prop?.website?.includes('https' || 'http')
                                    ? prop?.website
                                    : `https://${prop?.website}`
                            }`}
                        >
                            {prop?.website}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
