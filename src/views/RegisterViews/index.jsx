import Otherside from './partials/Otherside';
import RegisterForm from './partials/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';
import useAuth from '../../hooks/auth/useAuth';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

export default function RegisterViews() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { authRegister } = useAuth();
    const [passwordNotice, setPasswordNotice] = useState('');
    const pw = document.getElementById('password');
    const isImageUrl = useSelector((state) => state?.reg?.imageUrl);
    const [isName, setIsName] = useState('');
    const [isUsername, setIsUsername] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [IsPassword, setIsPassword] = useState('');
    const [isPasswordRepeat, setIsPasswordRepeat] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();

        const payload = {
            name: isName,
            username: isUsername,
            email: isEmail,
            phoneNumber: isPhoneNumber,
            password: IsPassword,
            passwordRepeat: isPasswordRepeat,
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
            }, 2000);
        } else {
            setIsLoading(false);
            api['error']({
                message: 'Register Failed',
                description: res?.response?.data?.message,
            });
        }
    };

    useEffect(() => {
        pw?.addEventListener('input' || 'change', (e) => {
            if (e.target.value.length < 8) {
                setPasswordNotice(
                    'Password must be at least 8 characters long'
                );
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
        });
    }, []);

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
                        setIsName={(e) => setIsName(e.target.value)}
                        setIsUsername={(e) => setIsUsername(e.target.value)}
                        setIsPassword={(e) => setIsPassword(e.target.value)}
                        setIsPasswordRepeat={(e) =>
                            setIsPasswordRepeat(e.target.value)
                        }
                        setIsEmail={(e) => setIsEmail(e.target.value)}
                        setIsPhoneNumber={(e) =>
                            setIsPhoneNumber(e.target.value)
                        }
                    />
                    <Otherside />
                </div>
            </div>
        </>
    );
}
