import { useEffect, useState } from 'react';
import Logo from '../../Elements/Logo';
import Aside from './partials/Aside';
import FootSide from './partials/FootSide.jsx';
import useAccount from '../../../hooks/user/useAccount.js';

export default function BaseLayout(prop) {
    const { children } = prop;
    const [isData, setIsData] = useState([]);
    const { getLogUser } = useAccount();
    const disableFootSide = [
        '/profile',
        '/login',
        '/register',
        '/edit-profile',
    ];
    const pathname = window.location.pathname;

    const getUser = async () => {
        await getLogUser('user')
            .then((res) => {
                setIsData(res?.data?.data);
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
                {!disableFootSide.includes(pathname) && <Logo />}
            </nav>
            <Aside {...isData} />
            <div
                style={{
                    padding: !disableFootSide.includes(pathname)
                        ? '20px 340px'
                        : '20px 40px 0 320px ',
                }}
            >
                {children}
            </div>
            {!disableFootSide.includes(pathname) && <FootSide {...isData} />}
            {/* <FootSide {...isData} /> */}
        </>
    );
}
