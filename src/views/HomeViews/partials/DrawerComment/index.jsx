import { Button, Input } from 'antd';
import { SUB_IMAGE } from '../../../../hooks/service/services';
import './DrawerComment.css';
import { SendOutlined } from '@ant-design/icons';
import usePost from '../../../../hooks/post/usePost';
import { useState } from 'react';
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

    const { commentPost } = usePost();
    const [isComment, setIsComment] = useState('');
    const comment = document.querySelector('#comment');

    const handleComment = async (e) => {
        e.preventDefault();
        const data = {
            postId: prop?.id,
            comment: isComment,
        };
        await commentPost(data).then((res) => {
            if (res?.status === 200) {
                comment.resetFields();
            }
        });
    };

    console.log(prop);

    return (
        <div className="comments">
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
                </div>
            ))}
            <Input
                type="text"
                style={{
                    width: '100%',
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
                    border: 'none',
                }}
                onClick={handleComment}
            >
                <SendOutlined style={{ padding: '10px' }} />
            </Button>
        </div>
    );
}
