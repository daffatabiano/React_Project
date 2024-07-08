import { Link } from 'react-router-dom';
import './Aside.css';
import { asideData } from '../../../../../hooks/data/asideData';
export default function Aside(prop) {
    const { profilePictureUrl } = prop;
    const token = localStorage.getItem('token');
    const pathname = window.location.pathname;
    return (
        <aside className="aside">
            <ul>
                {asideData.map((item, index) => (
                    <li
                        key={index}
                        className={pathname === item.to ? 'active' : ''}
                    >
                        <Link to={item.to}>
                            {item.title !== 'Profile' ? (
                                <i className={item.icon}></i>
                            ) : token ? (
                                <img
                                    src={
                                        profilePictureUrl ||
                                        'https://t4.ftcdn.net/jpg/05/09/07/49/360_F_509074967_jtbWlggeOjCGyQqAzA9uNgHoW6LWEDth.jpg'
                                    }
                                    alt=""
                                />
                            ) : null}
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
