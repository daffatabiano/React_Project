import './index.css';
import { useState } from 'react';
import { notification } from 'antd';
import LoginForm from './partials/LoginForm';
import useAuth from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginViews() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { authLogin } = useAuth();
    const navigate = useNavigate();

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
        const res = await authLogin(payload);
        setLoading(true);
        if (res?.status === 200) {
            api['success']({
                message: 'Login Success',
                description: res?.data?.message,
                duration: 1,
            });
            localStorage.setItem('token', `Bearer ${res?.data?.token}`);
            setLoading(false);
            setTimeout(() => {
                navigate('/profile');
            }, 1000);
        } else {
            setLoading(false);
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
