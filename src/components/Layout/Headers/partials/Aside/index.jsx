import { Link } from 'react-router-dom';
import './Aside.css';
import { asideData } from '../../../../../hooks/data/asideData';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { SUB_IMAGE } from '../../../../../hooks/service/services';
export default function Aside(prop) {
    const { md } = useBreakpoint();
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
                                    src={profilePictureUrl || SUB_IMAGE}
                                    alt=""
                                />
                            ) : null}
                            {md ? item.title : null}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
