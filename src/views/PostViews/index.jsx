import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, notification, Upload } from 'antd';
import {
    BASE_URL,
    SUB_EMPTY_DATA,
    SUB_POST_IMAGE,
} from '../../hooks/service/services';
import useAccount from '../../hooks/user/useAccount';
import { useState } from 'react';
import './PostViews.css';

export default function PostViews() {
    const { uploadImage } = useAccount();
    const [isFile, setIsFile] = useState(null);
    const [api, contextHolder] = notification.useNotification();
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

    return (
        <div className="post">
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
                        <img src={SUB_POST_IMAGE} alt="" />
                        <div className="act">
                            <button>
                                <CloseCircleOutlined
                                    style={{ color: 'red', opacity: 0.5 }}
                                />
                            </button>
                            <button>
                                <CheckCircleOutlined
                                    style={{ color: 'green', opacity: 0.5 }}
                                />
                            </button>
                        </div>
                    </div>
                    <input type="file" />
                </div>
                <div className="post-caption">
                    <label htmlFor="caption"> Caption</label>
                    <textarea name="" id="" placeholder="Add caption" />
                </div>
            </div>
            <div className="post-action">
                <button>Create Post</button>
            </div>
        </div>
    );
}
