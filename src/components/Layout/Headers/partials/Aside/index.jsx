import { Link, useParams } from 'react-router-dom';
import './Aside.css';
import { asideData } from '../../../../../hooks/data/asideData';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { SUB_IMAGE } from '../../../../../hooks/service/services';
import { useEffect, useRef } from 'react';
export default function Aside(prop) {
    const { md } = useBreakpoint();
    const { profilePictureUrl } = prop;
    const token = localStorage.getItem('token');
    const pathname = window.location.pathname;
    const asideRef = useRef(null);

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            if (window.screen.width <= 768) {
                if (scrollTop > lastScrollTop) {
                    asideRef.current.style.bottom = '-100px';
                    asideRef.current.style.transition = '0.5s all linear';
                } else {
                    asideRef.current.style.bottom = '0';
                }
                lastScrollTop = scrollTop;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <aside ref={asideRef} className="aside">
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
