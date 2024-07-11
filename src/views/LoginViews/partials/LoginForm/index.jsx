import { Link } from 'react-router-dom';
import { Input } from '../../../RegisterViews/partials/RegisterForm';
import './index.css';

const Logo = () => {
    return (
        <div className="form-header">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
            >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
        </div>
    );
};

const Button = (prop) => {
    const { loading, handleSubmit } = prop;
    return (
        <button
            type="submit"
            onClick={handleSubmit}
            className="form-footer"
            disabled={loading ? true : false}
        >
            {loading ? 'Loading...' : 'Login'}
        </button>
    );
};

export default function LoginForm(prop) {
    return (
        <div className="form">
            <Logo />
            <div className="form-body">
                <form>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={prop.onChangeEmail}
                        disabled
                        style={{ marginBottom: '20px' }}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        disabled
                        onChange={prop.onChangePassword}
                    />
                </form>
                <div className="add-others">
                    <Link to="/forgot-password">Forgot password?</Link>
                    <p style={{ marginBottom: '0px' }}>
                        Do not have an account?{' '}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
            <Button loading={prop.loading} handleSubmit={prop.submitButton} />
        </div>
    );
}
