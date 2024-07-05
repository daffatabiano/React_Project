import './index.css';

const Input = (prop) => {
    const { label, type, placeholder, name } = prop;
    return (
        <>
            <label htmlFor="">{label}</label>
            <input type={type} placeholder={placeholder} name={name} />
        </>
    );
};

const Button = (prop) => {
    const { text, type } = prop;
    return <button type={type}>{text}</button>;
};

export default function RegisterForm(prop) {
    const { onSubmit, isNotif, isLoading } = prop;
    return (
        <div className="register-form">
            <div className="register-form-header">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            </div>
            <form onSubmit={onSubmit}>
                {isNotif && (
                    <p
                        style={{
                            color:
                                isNotif === 'Register success'
                                    ? 'green'
                                    : 'red',
                        }}
                    >
                        {isNotif}
                    </p>
                )}
                <Input
                    label="Username"
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    disabled={isLoading}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    disabled={isLoading}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    disabled={isLoading}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    name="confirmPassword"
                    disabled={isLoading}
                />
                <Button
                    text={isLoading ? 'Loading...' : 'Sign Up'}
                    type="submit"
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}
