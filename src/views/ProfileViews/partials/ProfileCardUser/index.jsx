import { SettingOutlined } from '@ant-design/icons';
import './ProfileCardUser.css';
import { Divider, Dropdown, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export default function ProfileCardUser(prop) {
    const { md } = useBreakpoint();
    const navigate = useNavigate();

    console.log(prop[0]);
    return (
        <div>
            {md ? (
                <Modal
                    title="Followers"
                    centered
                    open={prop?.isShowModalFollowers}
                    onOk={() => prop?.setIsShowModalFollowers(false)}
                    onCancel={() => prop?.setIsShowModalFollowers(false)}
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
                    {prop?.isFollowers?.totalItems === 0 ? (
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
                        prop?.isFollowers?.users?.map((item) => (
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
                    {prop[0].totalItems === 0 ? (
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
                        prop[0]?.users?.map((item) => (
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
                                        onClick={prop?.handleUnfollow(item?.id)}
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
                            placement="right"
                            arrow
                            item={prop?.itemsDropDown}
                        >
                            <SettingOutlined />
                        </Dropdown>
                    </div>
                    <div className="info-content">
                        <p>
                            <span>{prop?.totalPost || 0}</span> Post
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
