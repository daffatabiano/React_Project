import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, notification, Upload } from 'antd';
import { SUB_POST_IMAGE_DARK } from '../../hooks/service/services';
import useAccount from '../../hooks/user/useAccount';
import { useState } from 'react';
import './PostViews.css';
import usePost from '../../hooks/post/usePost';

export default function PostViews() {
    const { uploadImage } = useAccount();
    const [isFile, setIsFile] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [isCaption, setIsCaption] = useState('');
    const [isImageUrl, setIsImageUrl] = useState('');
    const { createPost } = usePost();
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file.size < 1000000) {
            setIsFile(file);
        } else {
            api['error']({
                message: 'Upload Failed',
                description: 'Your file is too big, max.1mb',
            });
        }
    };

    const handleUploadImage = async () => {
        const newForm = new FormData();
        newForm.append('image', isFile);

        try {
            const res = await uploadImage(newForm);
            if (res?.status === 200) {
                setIsImageUrl(res?.data?.url);
                api['success']({
                    message: 'Upload Success',
                    description: 'Image uploaded',
                });
            }
        } catch (err) {
            api['error']({
                message: 'Upload Failed',
                description: err?.response?.data?.message,
            });
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        const body = {
            imageUrl: isImageUrl,
            caption: isCaption,
        };

        try {
            const res = await createPost(body);
            if (res?.status === 200) {
                api['success']({
                    message: 'Post Success',
                    description: 'Your post has been created',
                });
            }
        } catch (err) {
            api['error']({
                message: 'Post Failed',
                description: err?.response?.data?.message,
            });
        }
    };

    return (
        <div className="post">
            {contextHolder}
            <div className="post-header">
                <Divider
                    style={{ color: 'white', borderColor: 'white' }}
                    orientation="left"
                    orientationMargin={0}
                >
                    <h1
                        style={{
                            fontFamily: 'Homemade Apple',
                            fontWeight: 'bold',
                        }}
                    >
                        Post
                    </h1>
                </Divider>
                <span style={{ fontWeight: '300', fontStyle: 'italic' }}>
                    Make your profile more attractive, add your post
                </span>
            </div>
            <div className="card-post">
                <div className="post-img">
                    <div className="img">
                        <img
                            src={
                                isFile?.name
                                    ? URL.createObjectURL(isFile)
                                    : SUB_POST_IMAGE_DARK
                            }
                            alt=""
                        />
                        {isFile && (
                            <div className="act">
                                <button
                                    onClick={() => {
                                        setIsFile(null);
                                        setIsImageUrl('');
                                        api['success']({
                                            message: 'Delete Success',
                                            description: 'Image deleted',
                                            duration: 1,
                                        });
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 2000);
                                    }}
                                >
                                    <CloseCircleOutlined
                                        style={{ color: 'red', opacity: 0.5 }}
                                    />
                                </button>
                                <button onClick={handleUploadImage}>
                                    <CheckCircleOutlined
                                        style={{ color: 'green', opacity: 0.5 }}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                    <input type="file" onChange={handleFile} />
                </div>
                <div className="post-caption">
                    <label htmlFor="caption">Caption</label>
                    <textarea
                        onChange={(e) => setIsCaption(e.target.value)}
                        placeholder="Add caption"
                    />
                </div>
            </div>
            <div className="post-action">
                <button onClick={handlePost}>Create Post</button>
            </div>
        </div>
    );
}
