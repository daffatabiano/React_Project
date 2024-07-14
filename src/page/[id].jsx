import { useLocation } from 'react-router-dom';
import UserDetailViews from '../views/UserDetailViews';

const UserDetail = () => {
    const location = useLocation();
    const isId = location?.pathname;

    return <UserDetailViews {...{ isId }} />;
};

export default UserDetail;
