import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import PostDetailCard from '../UserDetailViews/partials/PostDetailCard';
import ProfileCardUser from './partials/ProfileCardUser';
import './ProfileViews.css';

export default function ProfileViews() {
    return (
        <div className="profile">
            <ProfileCardUser />
            <div className="profile-posting">
                <PostDetailCard />
            </div>
        </div>
    );
}
