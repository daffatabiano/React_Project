import { useEffect } from 'react';
import Logo from '../../Elements/Logo';
import Aside from './partials/Aside';
import FootSide from './partials/FootSide.jsx';
import useAccount from '../../../hooks/user/useAccount.js';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint.js';
import { useDispatch, useSelector } from 'react-redux';
import { userLogData } from '../../../redux/slice/inventorySlice.js';

export default function BaseLayout(prop) {
    const { md } = useBreakpoint();
    const { children } = prop;
    const { getLogUser } = useAccount();
    const disableFootSide = [
        '/profile',
        '/login',
        '/register',
        '/edit-profile',
        '/explore',
    ];
    const disableAside = ['/edit-profile'];
    const dispatch = useDispatch();
    const pathname = window.location.pathname;

    const getUser = async () => {
        await getLogUser('user')
            .then((res) => {
                dispatch(userLogData(res.data.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const useGetData = useSelector((state) => state?.inventory?.user[0]);

    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <nav className="text-center pt-2">
                {!disableFootSide.includes(pathname) && <Logo />}
            </nav>
            {!disableAside.includes(pathname) ? (
                <Aside {...useGetData} />
            ) : null}
            {/* <Aside {...isData} /> */}
            <div>{children}</div>
            {!disableFootSide.includes(pathname) && md ? (
                <FootSide {...useGetData} />
            ) : null}
        </>
    );
}
