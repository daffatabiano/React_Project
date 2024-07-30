import { Button, Input, Popconfirm } from 'antd';
import { SUB_IMAGE } from '../../../../hooks/service/services';
import './DrawerComment.css';
import { DeleteOutlined, SendOutlined } from '@ant-design/icons';
import usePost from '../../../../hooks/post/usePost';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAccount from '../../../../hooks/user/useAccount';
import { useSelector } from 'react-redux';
export default function DrawerComment(prop) {
    const apiCreatedAt = prop?.createdAt?.split('T')[0];
    const apiDate = new Date(apiCreatedAt);
    const date = new Date();
    const diffMlsec = date - apiDate;
    const diffDay = Math.floor(diffMlsec / (1000 * 60 * 60 * 24));
    let result = '';
    if (diffDay > 30) {
        result = Math.floor(diffDay / 30) + ' month ago';
        const month = Math.floor(diffDay / 30);
        if (month > 12) {
            result = Math.floor(diffDay / 30 / 12) + ' year ago';
        }
    } else if (diffDay > 7) {
        result = Math.floor(diffDay / 7) + ' week ago';
    } else if (diffDay) {
        result = Math.floor(diffDay) + ' day ago';
    } else if (diffDay * 24 > 24) {
        result = Math.floor((diffDay * 24) / 24) + ' hour ago';
    } else {
        result = Math.floor((diffDay * 24 * 60) / 60) + ' minute ago';
    }

    const { commentPost, commentDelete } = usePost();
    const { getLogUser } = useAccount();
    const [isComment, setIsComment] = useState('');
    const [isMyData, setIsMyData] = useState(null);
    const comment = document.querySelector('#comment');
    const navigate = useNavigate();
    const isDetail = useSelector((state) => state?.post);

    const getLogUserData = async () => {
        const res = await getLogUser('user');
        setIsMyData(res?.data?.data);
    };

    useEffect(() => {
        getLogUserData();
    }, []);

    const handleComment = async (e) => {
        e.preventDefault();
        const data = {
            postId: prop?.id,
            comment: isComment,
        };
        await commentPost(data)
            .then((res) => {
                if (res?.status === 200) {
                    prop.api['success']({
                        message: 'success',
                        description: res?.data?.message,
                    });
                }
            })
            .catch((err) =>
                prop?.api['error']({
                    message: 'error',
                    description: err?.response?.data?.message,
                })
            );
    };

    const handleConfirmDeleted = async (id) => {
        const res = await commentDelete(id);
        if (res?.status === 200) {
            prop.api['success']({
                message: 'Success',
                description: res?.data?.message,
            });
            setTimeout(() => {
                navigate(0);
            }, 1000);
        } else {
            prop.api['error']({
                message: 'Failed',
                description: res?.response?.data?.message,
            });
        }
    };

    return (
        <div className="comments">
            <div className="postinger">
                <div className="profile">
                    <img src={SUB_IMAGE} alt="" />
                    <h4>
                        {'balbalbalbalbalablababalbalabla'}{' '}
                        <span>{`• ${result}`}</span>
                    </h4>
                </div>
                <div className="comment">
                    {'balbalbalbalbalablababalbalabla'}
                </div>
                <hr />
            </div>
            {prop?.comments?.length === 0 && <h3>Be the first to comment.</h3>}
            {prop?.comments?.map((item) => (
                <div key={item.id} className="profile">
                    <img
                        src={
                            item?.user?.profilePictureUrl?.length < 20
                                ? SUB_IMAGE
                                : item?.user?.profilePictureUrl
                        }
                        alt={`profile of ${item?.user?.username || 'unknown'}`}
                    />
                    <div className="content-drawer">
                        <h4>
                            {item?.user?.username} <span>{`• ${result}`}</span>
                        </h4>
                        <p>{item?.comment}</p>
                    </div>
                    {item?.user?.id === isMyData?.id ? (
                        <Popconfirm
                            title="Delete Comment"
                            description="Are you sure to delete this comment?"
                            onConfirm={handleConfirmDeleted.bind(this, item.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                danger
                                style={{
                                    margin: 'auto',
                                }}
                            >
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    ) : null}
                </div>
            ))}
            <div
                style={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '50px',
                }}
            />
            <Input
                type="text"
                style={{
                    width: '90%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    padding: '10px',
                    height: '50px',
                    outline: 'none',
                }}
                id="comments"
                onChange={(e) => setIsComment(e.target.value)}
                placeholder="Write a comment..."
            />
            <Button
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: '50px',
                    backgroundColor: 'transparent',
                }}
                onClick={handleComment}
            >
                <SendOutlined style={{ padding: '10px' }} />
            </Button>
        </div>
    );
}
