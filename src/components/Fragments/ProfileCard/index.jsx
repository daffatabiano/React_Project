import { EllipsisOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Divider, Modal } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SUB_IMAGE } from '../../../hooks/service/services';
import { useEffect, useState } from 'react';
import useGetPost from '../../../hooks/post/useGet';

export default function ProfileCard(prop) {
    const { getFollowing, getFollowers } = useGetPost();
    const params = useParams();
    const [isFollowers, setIsFollowers] = useState([]);
    const [isFollowing, setIsFollowing] = useState([]);
    const [isShowModalFollowers, setIsShowModalFollowers] = useState(false);
    const [isShowModalFollowing, setIsShowModalFollowing] = useState(false);
    const navigate = useNavigate();

    const handleGetFollowing = async () => {
        const res = await getFollowing(params?.id);
        setIsFollowing(res?.data?.data);
        if (res?.status === 200) {
            setIsShowModalFollowing(!isShowModalFollowing);
        }
    };
    const handleGetFollowers = async () => {
        const res = await getFollowers(params?.id);
        setIsFollowers(res?.data?.data);
        if (res?.status === 200) {
            setIsShowModalFollowers(!isShowModalFollowers);
        }
    };

    console.log(isFollowing, 'isFollowing');

    useEffect(() => {
        handleGetFollowing();
        handleGetFollowers();
    }, []);

    return (
        <>
            {isShowModalFollowing && (
                <Modal
                    title="Following"
                    centered
                    open={isShowModalFollowing}
                    onOk={() => setIsShowModalFollowing(false)}
                    onCancel={() => setIsShowModalFollowing(false)}
                    onClose={() => setIsShowModalFollowing(false)}
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
                    {isFollowing?.length === 0 ? (
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
                                            backgroundColor: '#1677ff',
                                            color: 'white',
                                            borderRadius: '10px',
                                        }}
                                        type="button"
                                        onClick={() => {
                                            navigate(
                                                `/personal-profile/${item.id}`
                                            );
                                            setTimeout(() => {
                                                setIsShowModalFollowing(false);
                                            }, 500);
                                        }}
                                    >
                                        Visit
                                    </button>
                                </div>
                                <Divider />
                            </div>
                        ))
                    )}
                </Modal>
            )}
            {isShowModalFollowers && (
                <Modal
                    title="Followers"
                    centered
                    open={isShowModalFollowers}
                    onOk={() => setIsShowModalFollowers(false)}
                    onCancel={() => setIsShowModalFollowers(false)}
                    onClose={() => setIsShowModalFollowers(false)}
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
                    {isFollowers?.length === 0 ? (
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
                                No followers
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
                                            backgroundColor: '#1890ff',
                                            color: 'white',
                                            borderRadius: '10px',
                                        }}
                                        type="button"
                                        onClick={() => {
                                            navigate(
                                                `/personal-profile/${item.id}`
                                            );
                                            setTimeout(() => {
                                                setIsShowModalFollowers(false);
                                            }, 500);
                                        }}
                                    >
                                        Visit
                                    </button>
                                </div>
                                <Divider />
                            </div>
                        ))
                    )}
                </Modal>
            )}

            <div className="profile-card">
                <div className="card-img">
                    <img src={prop?.profilePictureUrl || SUB_IMAGE} alt="" />
                </div>
                <div className="card-info">
                    <div className="info-title">
                        <p>{prop?.name || '(Unknown)'}</p>
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
                            <span>{prop?.totalPosts || 0}</span> Post
                        </p>
                        <p
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                setIsShowModalFollowers(!isShowModalFollowers)
                            }
                        >
                            <span>{isFollowers?.totalItems || 0}</span>{' '}
                            Followers
                        </p>
                        <p
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                setIsShowModalFollowing(!isShowModalFollowing)
                            }
                        >
                            <span>{isFollowing?.totalItems || 0}</span>{' '}
                            Following
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
        </>
    );
}
