import axios from 'axios';
import Otherside from './partials/Otherside';
import RegisterForm from './partials/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

export default function RegisterViews() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isNotif, setIsNotif] = useState('');
    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (e.target.confirmPassword !== e.target.password) {
            setIsNotif('Password should be same !');
            setTimeout(() => {
                setIsNotif('');
                setIsLoading(false);
            }, 3000);
            return;
        }

        const payload = {
            email: e?.target?.email?.value,
            password: e?.target?.password?.value,
        };
        axios
            .post('https://reqres.in/api/register', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':
                        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            })
            .then(() => {
                setIsLoading(false);
                setIsNotif('Register success');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch((err) => {
                setIsLoading(false);
                setIsNotif(err.response.data.error);
            });
    };

    return (
        <>
            <div className="register-background">
                <div className="container-register">
                    <RegisterForm
                        isLoading={isLoading}
                        isNotif={isNotif}
                        onSubmit={handleRegister}
                    />
                    <Otherside />
                </div>
            </div>
        </>
    );
}
