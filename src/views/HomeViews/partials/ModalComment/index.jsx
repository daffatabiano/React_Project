import { DeleteOutlined } from '@ant-design/icons';
import { SUB_IMAGE, SUB_POST_IMAGE } from '../../../../hooks/service/services';
import './ModalComment.css';
import { useSelector } from 'react-redux';
import usePost from '../../../../hooks/post/usePost';
import { Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ModalComment(prop) {
    const { commentDelete } = usePost();

    const navigate = useNavigate();

    const idUserCommented = useSelector(
        (state) => state?.inventory?.user[0]?.id
    );

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
                    <div
                        className="uploaded"
                        onClick={() =>
                            navigate(`/personal-profile/${prop?.userId}`)
                        }
                    >
                        <img
                            src={
                                prop?.user?.profilePictureUrl?.length < 20 ||
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
                                {item?.user?.id === idUserCommented ? (
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
