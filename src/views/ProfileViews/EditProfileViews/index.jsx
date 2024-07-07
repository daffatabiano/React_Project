import BaseLayout from '../../../components/Layout/Headers/BaseLayout';
import './EditProfileViews.css';

export default function EditProfileViews() {
    return (
        <BaseLayout>
            <div>
                <h1>Edit Profile</h1>
                <div className="form-profile">
                    <div className="profile">
                        <img src="https://via.placeholder.com/150" alt="" />
                        <p>
                            <span>{'John Doe'}</span>
                            {'@johndoe'}
                        </p>
                    </div>
                    <button onClick={() => {}}>Change photo</button>
                </div>
            </div>
        </BaseLayout>
    );
}
