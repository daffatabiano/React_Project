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

const CustomInput = (prop) => {
    const {
        placeholder,
        label,
        type = 'text',
        defaultValue,
        name,
        ...rest
    } = prop;
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
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
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
    const { editUser, uploadImage, getLogUser } = useAccount();
    const [isData, setIsData] = useState([]);

    const getMyData = async () => {
        const res = await getLogUser('user');
        setIsData(res?.data?.data);
    };

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

        const res = await editUser({
            profilePictureUrl: isImageUrl || isData?.profilePictureUrl,
            name: e.target.name.value || isData?.name,
            username: e.target.name.value || isData?.username,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value || isData?.phoneNumber,
            bio: e.target.bio.value || isData?.bio,
            website: e.target.website.value || isData?.website,
        });

        if (res?.status === 200) {
            setIsLoading(false);
            api['success']({
                message: 'Edit Success',
                description: res?.data?.message,
            });
            setTimeout(() => {
                getMyData();
            }, 1000);
            setIsSectionPage(2);
        } else {
            setIsLoading(false);
            api['error']({
                message: 'Edit Failed',
                description:
                    res?.response?.data?.message ||
                    res?.data?.message ||
                    'Something went wrong !',
            });
        }
    };

    useEffect(() => {
        getMyData();
    }, []);

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
                                    name="name"
                                    defaultValue={isData?.name}
                                    placeholder={isData?.name}
                                />
                                <CustomInput
                                    label="Username"
                                    name="username"
                                    isData={isData?.username}
                                />
                                <CustomInput
                                    type="email"
                                    name="email"
                                    label="Email"
                                    isData={isData?.email}
                                />
                                <CustomInput
                                    label="Website"
                                    name="website"
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
                                                width: md ? '15%' : '20%',
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
                                            placeholder={isData?.phoneNumber}
                                            name="phoneNumber"
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
                                            onClick={() => navigate(-1)}
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
                                            htmlType="submit"
                                        >
                                            Submit Change
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        htmlType="button"
                                        onClick={() => navigate('/profile')}
                                        style={{
                                            backgroundColor: '#ffff',
                                            color: '#010101',
                                            width: '100%',
                                            borderRadius: '15px',
                                        }}
                                        size="large"
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
