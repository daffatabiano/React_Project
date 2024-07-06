import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { notification } from 'antd';
import LoginForm from './partials/LoginForm';
import useAuth from '../../hooks/auth/useAuth';
export default function LoginViews() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { handleLogin } = useAuth();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password,
        };
        const res = await handleLogin(payload);
        if (res?.status === 200) {
            api['success']({
                message: 'Login Success',
                description: res?.data?.message,
            });
            localStorage.setItem('token', res?.data?.token);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            api['error']({
                message: 'Login Failed',
                description: res?.response?.data?.message,
            });
        }
    };
    return (
        <div className="bg">
            {contextHolder}
            <LoginForm
                loading={loading}
                submitButton={handleSubmit}
                onChangeEmail={handleEmailChange}
                onChangePassword={handlePasswordChange}
            />
        </div>
    );
}
