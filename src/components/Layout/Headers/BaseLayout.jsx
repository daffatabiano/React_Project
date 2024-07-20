import { useEffect, useState } from 'react';
import Logo from '../../Elements/Logo';
import Aside from './partials/Aside';
import FootSide from './partials/FootSide.jsx';
import useAccount from '../../../hooks/user/useAccount.js';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint.js';

export default function BaseLayout(prop) {
    const { children } = prop;
    const { getLogUser } = useAccount();
    const disableLogo = [
        '/profile',
        '/login',
        '/register',
        '/edit-profile',
        '/explore',
    ];
    const disableAside = ['/edit-profile'];
    const pathname = window.location.pathname;
    const [isData, setIsData] = useState([]);

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
