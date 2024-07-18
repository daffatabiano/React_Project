import { useSelector } from 'react-redux';
import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import PostDetailCard from '../UserDetailViews/partials/PostDetailCard';
import ProfileCardUser from './partials/ProfileCardUser';
import './ProfileViews.css';

export default function ProfileViews() {
    const isDataProfile = useSelector((state) => state?.inventory?.user[0]);
    console.log(isDataProfile);

    return (
        <BaseLayout>
            <div className="profile">
                <ProfileCardUser />
                <PostDetailCard />
            </div>
        </BaseLayout>
    );
}
