import { Link } from 'react-router-dom';
import './index.css';

const SocialMediaLink = (prop) => {
    const { icons } = prop;
    return (
        <li>
            <Link data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className={`bi bi-${icons}`}></i>
            </Link>
        </li>
    );
};
export default function Otherside() {
    return (
        <>
            <div className="other-side">
                <h6>
                    Already have an account ? <Link to="/login">Login</Link>
                </h6>
                <h3>or login with</h3>
                <ul className="social-media">
                    <SocialMediaLink icons="facebook" />
                    <SocialMediaLink icons="twitter" />
                    <SocialMediaLink icons="linkedin" />
                    <SocialMediaLink icons="github" />
                    <SocialMediaLink icons="google" />
                </ul>
            </div>
        </>
    );
}
