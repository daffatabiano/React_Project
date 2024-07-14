import { useLocation } from 'react-router-dom';
import UserDetailViews from '../../views/UserDetailViews';

const UserDetail = () => {
    const location = useLocation();
    const p = location?.pathname;
    const r = p?.split('/')[2];
    const isId = `/${r}`;

    return <UserDetailViews {...{ isId }} />;
};

export default UserDetail;
