import Otherside from './partials/Otherside';
import RegisterForm from './partials/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';
import useAuth from '../../hooks/auth/useAuth';
import { message, notification } from 'antd';

export default function RegisterViews() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { authRegister } = useAuth();
    const [passwordNotice, setPasswordNotice] = useState('');
    const pw = document.querySelector('#password');

    pw?.addEventListener('input', (e) => {
        e.preventDefault;
        console.log(e.target.value);
        if (e.target.value.length < 8) {
            setPasswordNotice('Password must be at least 8 characters long');
            return;
        } else if (!/[A-Z]/.test(e.target.value)) {
            setPasswordNotice(
                'Password must contain at least one uppercase letter'
            );
            return;
        } else if (!/[a-z]/.test(e.target.value)) {
            setPasswordNotice(
                'Password must contain at least one lowercase letter'
            );
            return;
        } else if (!/\d/.test(e.target.value)) {
            setPasswordNotice('Password must contain at least one number');
            return;
        }
        setPasswordNotice('');
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        const payload = {
            name: e?.target?.name?.value,
            username: e?.target?.username?.value,
            email: e?.target?.email?.value,
            password: e?.target?.password?.value,
            passwordRepeat: e?.target?.passwordRepeat?.value,
            profilePictureUrl: e?.target?.profilePictureUrl?.value,
            phoneNumber: e?.target?.phoneNumber?.value,
            bio: '',
            website: '',
        };

        if (payload.password !== payload.passwordRepeat) {
            api['error']({ message: 'Password should be same !' });
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            return;
        }
        const res = await authRegister(payload);
        setIsLoading(true);
        if (res?.status === 200) {
            setIsLoading(false);
            api['success']({
                message: 'Register Success',
                description: res?.data?.message,
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setIsLoading(false);
            api['error']({
                message: 'Register Failed',
                description: res?.response?.data?.message,
            });
        }
    };

    return (
        <>
            <div className="register-background">
                {contextHolder}
                <div className="container-register">
                    <RegisterForm
                        isLoading={isLoading}
                        onSubmit={handleRegister}
                        passwordNotice={passwordNotice}
                    />
                    <Otherside />
                </div>
            </div>
        </>
    );
}
