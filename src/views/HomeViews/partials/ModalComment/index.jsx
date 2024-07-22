import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SUB_IMAGE, SUB_POST_IMAGE } from '../../../../hooks/service/services';
import './ModalComment.css';
import usePost from '../../../../hooks/post/usePost';
import { Button, Dropdown, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAccount from '../../../../hooks/user/useAccount';
import { useEffect, useState } from 'react';
import { clearIsShow, setIsShow } from '../../../../redux/slice/postSlice';
import { useDispatch } from 'react-redux';

export default function ModalComment(prop) {
    const { commentDelete, deletePost } = usePost();
    const { getLogUser } = useAccount();
    const [isMyData, setIsMyData] = useState([]);

    const getLogUserData = async () => {
        const res = await getLogUser('user');
        setIsMyData(res?.data?.data);
    };

    useEffect(() => {
        getLogUserData();
    }, []);

    const navigate = useNavigate();

    const handleConfirmDeleted = async (id) => {
        const res = await commentDelete(id);
        if (res?.status === 200) {
            prop.api['success']({
                message: 'Success',
                description: res?.data?.message,
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    const handleDeletePost = async () => {
        const res = await deletePost(prop?.id);
        if (res?.status === 200) {
            prop.api['success']({
                message: 'Success',
                description: res?.data?.message,
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };
    const dispatch = useDispatch();

    return (
        <div className="modal-comment">
            <div className="modal-picture">
                <img
                    src={
                        prop.imageUrl?.length < 15 ||
                        prop?.imageUrl?.includes('fakepath')
                            ? SUB_POST_IMAGE
                            : prop.imageUrl
                    }
                    alt={`posted by ${prop?.username || 'unknown'}`}
                />
            </div>
            <div className="modal-content">
                <div className="content">
                    <div className="uploaded">
                        <div
                            className="identity"
                            onClick={() =>
                                navigate(`/personal-profile/${prop?.userId}`)
                            }
                        >
                            <img
                                src={
                                    prop?.user?.profilePictureUrl?.length <
                                        20 ||
                                    prop?.user?.profilePictureUrl === undefined
                                        ? SUB_IMAGE
                                        : prop?.user?.profilePictureUrl
                                }
                                alt={`profile of ${
                                    prop?.user?.username || 'unknown'
                                }`}
                            />
                            <p>
                                <span>{prop?.user?.username || 'unknown'}</span>
                                {prop.caption}
                            </p>
                        </div>
                        <div className="action">
                            <Dropdown
                                trigger={['hover']}
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
                                                        color: '#007bff',
                                                        textAlign: 'left',
                                                    }}
                                                    type="button"
                                                    onClick={() => {
                                                        navigate(
                                                            `/post/${prop?.id}`
                                                        );
                                                    }}
                                                >
                                                    <EditOutlined /> Edit
                                                </button>
                                            ),
                                        },
                                        {
                                            key: '2',
                                            label: (
                                                <button
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor:
                                                            'transparent',
                                                        color: 'red',
                                                        textAlign: 'left',
                                                    }}
                                                    onClick={() => {
                                                        handleDeletePost;
                                                    }}
                                                >
                                                    <DeleteOutlined /> Delete
                                                </button>
                                            ),
                                        },
                                    ],
                                }}
                                arrow={{ pointAtCenter: true }}
                            >
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <i className="bi bi-three-dots" />
                                </button>
                            </Dropdown>
                        </div>
                    </div>
                    <hr />
                    <div className="comments">
                        {prop?.comments?.length <= 0 && (
                            <h4>Be the first to comment</h4>
                        )}
                        {prop?.comments?.map((item) => (
                            <div key={item.id} className="profile">
                                <div className="content">
                                    {item?.comment?.length === '' ? (
                                        <h4>hello, Be the first to comment</h4>
                                    ) : (
                                        <>
                                            <img
                                                src={
                                                    item?.user
                                                        ?.profilePictureUrl
                                                        ?.length < 20
                                                        ? SUB_IMAGE
                                                        : item?.user
                                                              ?.profilePictureUrl
                                                }
                                                alt={`profile of ${
                                                    item?.user?.username ||
                                                    'unknown'
                                                }`}
                                            />
                                            <p>
                                                <span>
                                                    {item?.user?.username}
                                                </span>
                                                {item?.comment || '(empty)'}
                                            </p>
                                        </>
                                    )}
                                </div>
                                {item?.user?.id === isMyData?.id ? (
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        onConfirm={handleConfirmDeleted.bind(
                                            this,
                                            item.id
                                        )}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger>
                                            <DeleteOutlined />
                                        </Button>
                                    </Popconfirm>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
