import { SettingOutlined } from '@ant-design/icons';
import './ProfileCardUser.css';
import { useEffect, useState } from 'react';
import { Divider, Dropdown, Modal, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import useGetPost from '../../../../hooks/post/useGet';
import usePost from '../../../../hooks/post/usePost';
import useAccount from '../../../../hooks/user/useAccount';
import useAuth from '../../../../hooks/auth/useAuth';

export default function ProfileCardUser() {
    const [api, contextHolder] = notification.useNotification();
    const [isShowModalFollowing, setIsShowModalFollowing] = useState(false);
    const [isShowModalFollowers, setIsShowModalFollowers] = useState(false);
    const navigate = useNavigate();
    const [isData, setIsData] = useState([]);
    const { md } = useBreakpoint();
    const { getMyFollowing, getMyFollowers } = useGetPost();
    const { unfollowPost } = usePost();
    const [isFollowing, setIsFollowing] = useState([]);
    const [isFollowers, setIsFollowers] = useState([]);
    const { getLogUser } = useAccount();
    const { authLogout } = useAuth();
    const token = localStorage.getItem('token');

    const getLogUserData = async () => {
        const res = await getLogUser('user');
        setIsData(res?.data?.data);
    };
    useEffect(() => {
        getLogUserData();
    }, []);

    const handleGetFollowing = async () => {
        const res = await getMyFollowing('size=9999&page=1');
        if (res?.status === 200) {
            setIsFollowing(res?.data?.data);
        }
    };
    console.log(isFollowing);
    const handleGetFollowers = async () => {
        const res = await getMyFollowers('size=9999&page=1');
        setIsFollowers(res?.data?.data);
    };

    const handleUnfollow = async (id) => {
        const res = await unfollowPost(id);
        if (res?.status === 200) {
            handleGetFollowing();
        }
    };

    const handleLogout = async () => {
        const res = await authLogout(token);
        if (res?.status === 200) {
            api['success'] = {
                message: 'Logout success',
                description: res?.data?.message,
            };
            navigate('/login');
        } else {
            api['error'] = {
                message: 'Logout Failed',
                description: res?.response?.data?.message,
            };
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <p style={{ color: 'red' }} onClick={() => handleLogout}>
                    Logout
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p style={{ color: 'red' }} onClick={() => handleLogout}>
                    Logout 2
                </p>
            ),
        },
    ];

    useEffect(() => {
        handleGetFollowing();
        handleGetFollowers();
    }, []);

    return (
        <div>
            {contextHolder}
            {md ? (
                <Modal
                    title="Followers"
                    centered
                    open={isShowModalFollowers}
                    onOk={() => setIsShowModalFollowers(false)}
                    onCancel={() => setIsShowModalFollowers(false)}
                    width={650}
                    style={{
                        maxHeight: '80vh',
                    }}
                    bodyStyle={{
                        maxHeight: '80vh',
                        minHeight: '80vh',
                        overflow: 'auto',
                        padding: '10px',
                        backgroundColor: 'transparent',
                        color: '#0101010',
                    }}
                >
                    {isFollowers?.totalItems === 0 ? (
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
                        isFollowers?.users?.map((item) => (
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
                    open={isShowModalFollowing}
                    onOk={() => setIsShowModalFollowing(false)}
                    onCancel={() => setIsShowModalFollowing(false)}
                    onClose={() => setIsShowModalFollowing(false)}
                    width={650}
                    footer={null}
                    style={{
                        maxHeight: '80vh',
                    }}
                    bodyStyle={{
                        maxHeight: '80vh',
                        minHeight: '80vh',
                        overflow: 'auto',
                        padding: '10px',
                        backgroundColor: 'transparent',
                        color: '#0101010',
                    }}
                >
                    {isFollowing?.totalItems === 0 ? (
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
                        isFollowing?.users?.map((item) => (
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
                                        onClick={handleUnfollow(item?.id)}
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
                    <img src={isData?.profilePictureUrl} alt="" />
                </div>
                <div className="card-info">
                    <div className="info-title">
                        <p>{isData?.name}</p>
                        <button
                            type="button"
                            onClick={() => navigate('/edit-profile')}
                        >
                            Edit profile
                        </button>
                        <button>View archive</button>
                        <Dropdown placement="right" arrow item={ items }>
                            <SettingOutlined />
                        </Dropdown>
                    </div>
                    <div className="info-content">
                        <p>
                            <span>{'0'}</span> Post
                        </p>
                        <p
                            onClick={() =>
                                md
                                    ? setIsShowModalFollowers(true)
                                    : navigate('/profile/followers')
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{isData?.totalFollowers}</span> Followers
                        </p>
                        <p
                            onClick={() =>
                                md
                                    ? setIsShowModalFollowing(true)
                                    : navigate('/profile/following')
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{isData?.totalFollowing}</span> Following
                        </p>
                    </div>
                    <div className="info-desc">
                        <h6>{isData?.username}</h6>
                        <p>{isData?.bio}</p>
                        <Link
                            to={`${
                                isData?.website?.includes('https' || 'http')
                                    ? isData?.website
                                    : `https://${isData?.website}`
                            }`}
                        >
                            {isData?.website}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
