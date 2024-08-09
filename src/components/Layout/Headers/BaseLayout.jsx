import { useEffect, useState } from 'react';
import Logo from '../../Elements/Logo';
import Aside from './partials/Aside';
import useAccount from '../../../hooks/user/useAccount.js';
import { useNavigate } from 'react-router-dom';

export default function BaseLayout(prop) {
    const { children } = prop;
    const { getLogUser } = useAccount();
    const disableLogo = [
        '/profile',
        '/login',
        '/register',
        '/edit-profile',
        '/explore',
        '/login',
        '/register',
    ];
    const disableAside = ['/edit-profile', '/login', '/register'];
    const pathname = window.location.pathname;
    const [isData, setIsData] = useState([]);
    const { path } = useNavigate();
    console.log(path, 'this is path');

    const getUser = async () => {
        await getLogUser('user')
            .then((res) => {
                setIsData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <nav className="text-center pt-2">
                {!disableLogo.includes(pathname) && <Logo />}
            </nav>
            {!disableAside.includes(pathname) ? <Aside {...isData} /> : null}
            <div>{children}</div>
        </>
    );
}
