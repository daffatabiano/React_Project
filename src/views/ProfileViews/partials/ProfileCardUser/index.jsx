import { SettingOutlined } from '@ant-design/icons';
import './ProfileCardUser.css';
import useAccount from '../../../../hooks/user/useAccount';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ProfileCardUser() {
    const [isData, setIsData] = useState({});
    const { getLogUser, editUser } = useAccount();
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const getDataUser = async () => {
        await getLogUser('user').then((res) => {
            setIsData(res?.data?.data);
        });
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        const body = {
            name: e?.target?.name?.value,
            username: e?.target?.username?.value,
            email: e?.target?.email?.value,
            profilePictureUrl: e?.target?.profilePictureUrl?.value,
            phoneNumber: e?.target?.phoneNumber?.value,
            bio: e?.target?.bio?.value,
            website: e?.target?.website?.value,
        };
        const res = await editUser(body);
        if (res?.status === 200) {
            api['success']({
                message: 'Edit Success',
                description: res?.data?.message,
            });
        } else {
            api['error']({
                message: 'Edit Failed',
                description: res?.response?.data?.message,
            });
        }
    };

    useEffect(() => {
        getDataUser();
    }, []);

    return (
        <div>
            {contextHolder}
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
                        <SettingOutlined />
                    </div>
                    <div className="info-content">
                        <p>
                            <span>{'4'}</span> Post
                        </p>
                        <p>
                            <span>{isData?.totalFollowers}</span> Followers
                        </p>
                        <p>
                            <span>{isData?.totalFollowing}</span> Following
                        </p>
                    </div>
                    <div className="info-desc">
                        <h6>{isData?.username}</h6>
                        <p>{isData?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
