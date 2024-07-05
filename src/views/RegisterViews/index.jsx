import axios from 'axios';
import Otherside from './partials/Otherside';
import RegisterForm from './partials/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

export default function RegisterViews() {
    const navigate = useNavigate();
    const [notif, setNotif] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        const payload = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        setLoading(true);
        axios
            .post('https://reqres.in/api/register', payload)
            .then(() => {
                setLoading(false);
                setNotif('Register Success');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                setNotif(err.response.data.error);
            });
    };

    return (
        <div className="register-background">
            <div className="container-register">
                <RegisterForm onSubmit={handleRegister} />
                <Otherside />
            </div>
        </div>
    );
}
