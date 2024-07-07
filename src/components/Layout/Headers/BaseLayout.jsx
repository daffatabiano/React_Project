import Logo from '../../Elements/Logo';
import Aside from './partials/Aside';
import FootSide from './partials/FootSide.jsx';

export default function BaseLayout(prop) {
    const { children } = prop;
    return (
        <>
            <nav className="text-center pt-2">
                <Logo />
            </nav>
            <Aside />
            <div style={{ padding: '20px 340px'  }}>{children}</div>
            <FootSide />
        </>
    );
}
