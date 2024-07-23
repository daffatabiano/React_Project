import Otherside from './partials/Otherside';
import RegisterForm from './partials/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';
import useAuth from '../../hooks/auth/useAuth';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearReg } from '../../redux/slice/registerSlice';

export default function RegisterViews() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { authRegister } = useAuth();
    const [passwordNotice, setPasswordNotice] = useState('');
    const pw = document.getElementById('password');
    const isImageUrl = useSelector((state) => state?.reg?.imageUrl);
    const isDataFirstSection = useSelector((state) => state?.reg?.reg[0]);
    const dispatch = useDispatch();
    console.log(isDataFirstSection, 'isDataFirstSection');
    const handleRegister = async (e) => {
        e.preventDefault();

        const payload = {
            name: isDataFirstSection?.name,
            username: isDataFirstSection?.username,
            email: isDataFirstSection?.email,
            phoneNumber: isDataFirstSection?.phoneNumber,
            password: isDataFirstSection?.password,
            passwordRepeat: isDataFirstSection?.passwordRepeat,
            bio: e.target.bio.value,
            website: e.target.website.value,
            profilePictureUrl: isImageUrl,
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
                dispatch(clearReg());
            }, 2000);
        } else {
            setIsLoading(false);
            console.log(res?.response?.data?.errors[0]?.message, 'EERRRORRO');
            api['error']({
                message: 'Register Failed',
                description:
                    res?.response?.data?.message ||
                    res?.response?.data?.errors[0]?.message,
            });
        }
    };

    useEffect(() => {
        const handleInputChange = (e) => {
            if (e.target.value.length < 8) {
                setPasswordNotice(
                    'Password must be at least 8 characters long'
                );
            } else if (!/[A-Z]/.test(e.target.value)) {
                setPasswordNotice(
                    'Password must contain at least one uppercase letter'
                );
            } else if (!/[a-z]/.test(e.target.value)) {
                setPasswordNotice(
                    'Password must contain at least one lowercase letter'
                );
            } else if (!/\d/.test(e.target.value)) {
                setPasswordNotice('Password must contain at least one number');
            } else {
                setPasswordNotice('');
            }
        };

        if (pw) {
            pw.addEventListener('input', handleInputChange);
        }

        return () => {
            if (pw) {
                pw.removeEventListener('input', handleInputChange);
            }
        };
    }, [isDataFirstSection?.password]);

    return (
        <>
            <div className="register-background">
                {contextHolder}
                <div className="container-register">
                    <RegisterForm
                        isLoading={isLoading}
                        onSubmit={handleRegister}
                        passwordNotice={passwordNotice}
                        api={api}
                    />
                    <Otherside />
                </div>
            </div>
        </>
    );
}
