/* eslint-disable react/prop-types */
import Navbar from '../Fragments/Navbar';
import Footer from '../Fragments/Footer';

const AuthLayout = (props) => {
    const { children } = props;
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default AuthLayout;
