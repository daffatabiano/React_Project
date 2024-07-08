import { useEffect, useState } from 'react';
import BaseLayout from '../../../components/Layout/Headers/BaseLayout';
import './EditProfileViews.css';
import { Button, Modal, notification, Result, Spin, Tooltip } from 'antd';
import useAccount from '../../../hooks/user/useAccount';
import { LoadingOutlined } from '@ant-design/icons';

export default function EditProfileViews() {
    const [api, contextHolder] = notification.useNotification();
    const [isData, setIsData] = useState([]);
    const [isFile, setIsFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSection, setIsSection] = useState(1);
    const [isImageUrl, setIsImageUrl] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isChangeName, setIsChangeName] = useState('');
    const [isChangeUsername, setIsChangeUsername] = useState('');
    const { editUser, getLogUser, uploadImage } = useAccount();

    const fileChange = (e) => {
        const file = e.target.files[0];
        setIsFile(file);
    };

    const getDataUser = async () => {
        setIsLoading(true);
        await getLogUser('user')
            .then((res) => {
                setIsData(res?.data?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleChangeImage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', isFile);

        try {
            const res = await uploadImage(formData);
            setIsImageUrl(res?.data?.url);
            if (res?.status === 200) {
                setIsLoading(false);
                api['success']({
                    message: 'Upload Success',
                    description: res?.data?.message,
                });
            } else {
                setIsLoading(false);
                api['error']({
                    message: 'Upload Failed',
                    description: res?.response?.data?.message,
                });
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err?.response?.data?.message);
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        setIsSection(1);

        const body = {
            name: isChangeName,
            username: isChangeUsername,
            profilePictureUrl: isImageUrl,
            email: isData?.email || '',
            phoneNumber: isData?.phoneNumber,
            bio: '',
            website: '',
        };

        await editUser(body)
            .then((res) => {
                if (res?.status === 200) {
                    setIsLoading(false);
                    setIsSection(2);
                    api['success']({
                        message: 'Edit Success',
                        description: res?.data?.message,
                    });
                } else {
                    setIsLoading(false);
                    api['error']({
                        message: 'Edit Failed',
                        description: res?.response?.data?.message,
                    });
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
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
                        display: isSection === 1 ? 'inline-block' : 'none',
                    },
                }}
                onOk={handleEditUser}
                cancelText={isSection === 2 ? 'Done' : 'Cancel'}
                cancelButtonProps={{
                    style: {
                        backgroundColor: isSection === 1 ? 'red' : 'green',
                        color: '#fff',
                    },
                }}
                onCancel={() => setIsShowModal(false)}
            >
                {isLoading ? (
                    <div
                        style={{
                            textAlign: 'center',
                            height: 'inherit',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '25px',
                        }}
                    >
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    spin
                                    style={{ fontSize: '100px' }}
                                />
                            }
                            style={{
                                width: '100%',
                                height: 'inherit',
                            }}
                        />
                        Loading...
                    </div>
                ) : isSection === 1 ? (
                    <form action="" className="modal-form">
                        <Tooltip title="Click to select a photo">
                            <div className="modal-photo">
                                <img
                                    src={
                                        isFile
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
                                onChange={(e) =>
                                    setIsChangeName(e?.target?.value)
                                }
                            />
                            <input
                                type="text"
                                defaultValue={isData?.username}
                                name="username"
                                onChange={(e) =>
                                    setIsChangeUsername(e?.target?.value)
                                }
                            />
                        </div>
                    </form>
                ) : (
                    <Result
                        status="success"
                        title="Successfully Changed!"
                        subTitle="Your profile has been changed now."
                    />
                )}
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
                            setIsSection(1);
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
