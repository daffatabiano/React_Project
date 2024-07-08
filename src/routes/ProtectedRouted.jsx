import { Navigate, Outlet } from 'react-router-dom';

const ProtectRouted = (prop) => {
    const { children } = prop;
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            {children}
            <Outlet />
        </>
    );
};

export default ProtectRouted;
