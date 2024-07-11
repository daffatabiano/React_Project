import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import ProfileCardUser from './partials/ProfileCardUser';
import './ProfileViews.css';

export default function ProfileViews() {
    return (
        <BaseLayout>
            <div className="profile">
                <ProfileCardUser />
            </div>
        </BaseLayout>
    );
}
