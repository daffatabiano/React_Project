import { Link } from 'react-router-dom';
import './Aside.css';
import { asideData } from '../../../../../hooks/data/asideData';
export default function Aside() {
    const token = localStorage.getItem('token');
    return (
        <aside className="aside">
            <ul>
                {asideData.map((item, index) => (
                    <li key={index}>
                        <Link to={item.to}>
                            {item.title !== 'Profile' ? (
                                <i className={item.icon}></i>
                            ) : token ? (
                                <img
                                    src="https://reqres.in/img/faces/9-image.jpg"
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
