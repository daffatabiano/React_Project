import { useEffect, useState } from 'react';
import BaseLayout from '../../../components/Layout/Headers/BaseLayout';
import './EditProfileViews.css';
import { Modal, notification, Tooltip } from 'antd';
import useAccount from '../../../hooks/user/useAccount';

export default function EditProfileViews() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isFile, setIsFile] = useState([]);
    const [isImageUrl, setIsImageUrl] = useState('');
    const { editUser, getLogUser, uploadImage } = useAccount();
    const [api, contextHolder] = notification.useNotification();
    const [isData, setIsData] = useState([]);

    const fileChange = (e) => {
        const file = e.target.files[0];
        setIsFile(file);
    };

    const getDataUser = async () => {
        await getLogUser('user')
            .then((res) => {
                setIsData(res?.data?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChangeImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', isFile);

        try {
            const res = await uploadImage(formData);
            console.log(res, 'res');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDataUser();
    }, []);

    return (
        <BaseLayout>
            {contextHolder}
            <Modal
                title="Change Profile Photo"
                open={isShowModal}
                okText="Submit"
                okType="submit"
                okButtonProps={{
                    style: {
                        backgroundColor: '#e8f3ff',
                        color: '#000',
                        border: '1px solid #dddddd',
                    },
                }}
                onOk={() => {
                    setIsShowModal(false);
                }}
            >
                <form action="" className="modal-form">
                    <Tooltip title="Click to select a photo">
                        <div className="modal-photo">
                            <img
                                src={
                                    isFile.length > 0
                                        ? URL.createObjectURL(isFile)
                                        : isData?.profilePictureUrl
                                }
                                alt={`profile of ${isData?.username}`}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={fileChange}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    paddingTop: '10px',
                                }}
                            >
                                <button
                                    className="btn btn-danger"
                                    onClick={() => setIsFile('')}
                                    type="button"
                                >
                                    clear
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleChangeImage}
                                    type="button"
                                >
                                    save
                                </button>
                            </div>
                            <p style={{ color: 'red' }}>
                                * Max file size is 1MB
                            </p>
                        </div>
                    </Tooltip>
                    <div className="modal-input">
                        <input
                            type="text"
                            defaultValue={isData?.name}
                            name="name"
                        />
                        <input
                            type="text"
                            defaultValue={isData?.username}
                            name="username"
                        />
                    </div>
                </form>
            </Modal>
            <div>
                <h1>Edit Profile</h1>
                <div className="form-profile">
                    <div className="profile">
                        <img src={isData?.profilePictureUrl} alt="" />
                        <p>
                            <span>{isData?.name}</span>
                            {isData?.username}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsShowModal(true);
                        }}
                    >
                        Change photo
                    </button>
                </div>
            </div>
        </BaseLayout>
    );
}
