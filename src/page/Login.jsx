import axios from 'axios';
import '../style/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from "../components/Elements/Alert";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notif, setNotif] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password,
        };
        setLoading(true);
        axios
            .post('https://reqres.in/api/login', payload)
            .then((res) => {
                setNotif({
                    type: 'success',
                    message: `Welcome Back ${res?.data?.token}`,
                });
                localStorage.setItem('token', res?.data?.token);
                console.log(res?.data);
                setLoading(false);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((err) => {
                setNotif({
                    type: 'danger',
                    message: err.response?.data?.error,
                });
                setLoading(false);
                console.log(err.response);
            });
    };

    return (
        <div className="bg">
            <div className="login">
                <div className="container">
                    <div className="logo">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-person"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </div>
                    <form action="">
                        {notif && (
                            <Alert type={notif.type} message={notif.message} />
                        )}
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleEmailChange}
                            placeholder="email"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            id="password"
                            onChange={handlePasswordChange}
                            placeholder="password"
                        />
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked
                            />
                            <p
                                className="form-check-label"
                                to="flexCheckDefault"
                            >
                                Remember Me!
                            </p>
                        </div>
                        <p id="register" className="form-text">
                            Do not have an account?{' '}
                            <Link to="/register">Register</Link>
                        </p>
                    </form>
                    <div className="button">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading ? true : false}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
