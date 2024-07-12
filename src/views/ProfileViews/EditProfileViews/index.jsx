import { useEffect, useState } from 'react';
import BaseLayout from '../../../components/Layout/Headers/BaseLayout';
import './EditProfileViews.css';
import {
    Button,
    Input,
    Modal,
    notification,
    Result,
    Space,
    Spin,
    Tooltip,
} from 'antd';
import useAccount from '../../../hooks/user/useAccount';
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomInput = (prop) => {
    const { isData, label, type = 'text', ...rest } = prop;
    return (
        <label style={{ width: '100%', color: 'white' }}>
            {label}
            <Input
                {...rest}
                style={{
                    padding: '15px 10px',
                    backgroundColor: 'transparent',
                    borderRadius: '15px',
                    border: '1px solid var(--primary)',
                    color: 'white',
                }}
                label="Name"
                type={type}
                name="name"
                defaultValue={isData}
            />
        </label>
    );
};

export default function EditProfileViews() {
    const [api, contextHolder] = notification.useNotification();
    const { md } = useBreakpoint();
    const [isFile, setIsFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSection, setIsSection] = useState(1);
    const [isImageUrl, setIsImageUrl] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isSectionPage, setIsSectionPage] = useState(1);
    const navigate = useNavigate();
    const { editUser, uploadImage } = useAccount();
    const isData = useSelector((state) => state?.inventory?.user[0]);

    const fileChange = (e) => {
        const file = e.target.files[0];

        if (file.size > 1000000) {
            api['error']({
                message: 'Upload fail',
                description: 'too bigger size, max.1mb',
            });
        } else {
            setIsFile(file);
        }
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

        await editUser({
            profilePictureUrl: isImageUrl,
            name: e.target.name.value,
            username: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            bio: e.target.bio.value,
            website: e.target.website.value,
        })
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

    return (
        <BaseLayout>
            {contextHolder}
            <div className="edit-profile">
                <Modal
                    title="Change Profile Photo"
                    open={isShowModal}
                    okText="Submit"
                    okType="submit"
                    okButtonProps={{
                        style: {
                            cursor: isFile ? 'pointer' : 'not-allowed',
                            backgroundColor: '#e8f3ff',
                            color: '#000',
                            border: '1px solid #dddddd',
                            display: isSection === 1 ? 'inline-block' : 'none',
                        },
                    }}
                    onOk={() => {
                        if (isFile) {
                            setIsSection(2);
                        }
                    }}
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
                                    disabled
                                    style={{
                                        cursor: 'not-allowed',
                                        opacity: '0.5',
                                    }}
                                />
                                <input
                                    type="text"
                                    defaultValue={isData?.username}
                                    name="username"
                                    disabled
                                    style={{
                                        cursor: 'not-allowed',
                                        opacity: '0.5',
                                    }}
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
                <div
                    style={{
                        width: md ? '75%' : '100%',
                        height: '100%',
                        padding: !md && '20px',
                    }}
                >
                    {isSectionPage === 1 ? (
                        <>
                            <h1>Edit Profile</h1>
                            <div className="form-profile">
                                <div className="profile">
                                    <img
                                        src={
                                            isFile
                                                ? URL.createObjectURL(isFile)
                                                : isData?.profilePictureUrl
                                        }
                                        alt=""
                                    />
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
                            <form
                                onSubmit={handleEditUser}
                                style={{
                                    padding: '20px',
                                    gap: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CustomInput
                                    label="Name"
                                    isData={isData?.name}
                                />
                                <CustomInput
                                    label="Username"
                                    isData={isData?.username}
                                />
                                <CustomInput
                                    type="email"
                                    label="Email"
                                    isData={isData?.email}
                                />
                                <CustomInput
                                    label="Website"
                                    isData={isData?.website}
                                />
                                <label htmlFor="" style={{ width: '100%' }}>
                                    Phone
                                    <Space.Compact
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Input
                                            style={{
                                                width: '15%',
                                                fontWeight: '600',
                                                backgroundColor:
                                                    'var(--primary)',
                                            }}
                                            defaultValue="+62"
                                        />
                                        <Input
                                            style={{
                                                width: '100%',
                                                backgroundColor: 'transparent',
                                                color: '#fff',
                                            }}
                                            defaultValue={isData?.phoneNumber}
                                            type="number"
                                        />
                                    </Space.Compact>
                                </label>
                                <label htmlFor="" style={{ width: '100%' }}>
                                    Bio
                                    <Input.TextArea
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderRadius: '15px',
                                            padding: '10px',
                                            color: '#ffff',
                                        }}
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        label="Bio"
                                        placeholder={isData?.bio}
                                        name="bio"
                                        defaultValue={isData?.bio}
                                        maxLength={250}
                                    />
                                </label>
                                {!md ? (
                                    <div
                                        style={{ display: 'flex', gap: '10px' }}
                                    >
                                        <Button
                                            style={{
                                                backgroundColor: '#ffff',
                                                color: '#010101',
                                                width: '100%',
                                                borderRadius: '15px',
                                            }}
                                            size="large"
                                            onClick={() => setIsSectionPage(2)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            style={{
                                                backgroundColor: '#ffff',
                                                color: '#010101',
                                                width: '100%',
                                                borderRadius: '15px',
                                            }}
                                            size="large"
                                            onClick={() => setIsSectionPage(2)}
                                        >
                                            Submit Change
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        style={{
                                            backgroundColor: '#ffff',
                                            color: '#010101',
                                            width: '100%',
                                            borderRadius: '15px',
                                        }}
                                        size="large"
                                        onClick={() => setIsSectionPage(2)}
                                    >
                                        Submit Change
                                    </Button>
                                )}
                            </form>
                        </>
                    ) : (
                        <div
                            style={{
                                margin: 'auto',
                                height: md ? '600px' : '320px',
                                width: md ? '600px' : '320px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                boxShadow:
                                    'inset 0 0 20px 5px rgba(225,225,225, 0.5)',
                            }}
                        >
                            <Result
                                style={{ color: 'var(--primary)' }}
                                icon={
                                    <CheckCircleFilled
                                        style={{ color: 'var(--primary)' }}
                                    />
                                }
                                title={
                                    <h1 style={{ color: '#ffff' }}>
                                        Profile already updated!
                                    </h1>
                                }
                                subTitle={
                                    <p
                                        style={{
                                            color: '#ffff',
                                            fontWeight: 300,
                                        }}
                                    >
                                        Your profile has been updated now.
                                    </p>
                                }
                                extra={
                                    <Button
                                        style={{
                                            backgroundColor: 'var(--primary)',
                                            outline: 'none',
                                            color: '#ffff',
                                        }}
                                        onClick={() => navigate('/')}
                                    >
                                        Go to home
                                    </Button>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
}
