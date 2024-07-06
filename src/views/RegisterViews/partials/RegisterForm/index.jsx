import './index.css';

export const Input = (prop) => {
    const { label, type, placeholder, name, ...rest } = prop;
    return (
        <>
            <label htmlFor="">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                {...rest}
            />
        </>
    );
};

export const Button = (prop) => {
    const { text, type = 'button' } = prop;
    return <button type={type}>{text}</button>;
};

export default function RegisterForm(prop) {
    const { onSubmit, isLoading, passwordNotice } = prop;
    return (
        <div className="register-form">
            <div className="register-form-header">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            </div>
            <form onSubmit={onSubmit}>
                <Input
                    label="Name*"
                    type="text"
                    placeholder="Enter Username"
                    name="name"
                    disabled={isLoading}
                    required
                />
                <Input
                    label="Username*"
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    disabled={isLoading}
                    required
                />
                <Input
                    label="Email*"
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    disabled={isLoading}
                    required
                />
                <Input
                    label="Password*"
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    disabled={isLoading}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                />
                {passwordNotice && (
                    <p style={{ color: 'red' }}>{`* ${passwordNotice}`}</p>
                )}
                <Input
                    label="Confirm Password*"
                    type="password"
                    placeholder="••••••••"
                    name="passwordRepeat"
                    disabled={isLoading}
                    required
                />
                <Input
                    label="Profile Picture Url*"
                    type="text"
                    placeholder="https://images.unsplash.com/photo-........"
                    name="profilePictureUrl"
                    disabled={isLoading}
                    required
                />
                <Input
                    label="Phone*"
                    type="number"
                    placeholder="+62 8xxxxxxx"
                    name="phoneNumber"
                    disabled={isLoading}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
