import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import SearchButton from './SearchButton';
import Button from '../Elements/Button';
import MySvgComponent from '../Elements/MySvgComponent';
import Logo from '../Elements/Logo';
import '../../style/navbar.css';

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const notificationsContent = {
        content: `Hello, welcome to our app!
        You have a lot notifications.
        You can check it in here,
        and you can see it in the top right corner.`,
    };

    //fungsi untuk mengubah warna ketika halaman di scroll;
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    //mengatur event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <nav className="navbar container-fluid">
            <Sidebar />
            <div className={scrollPosition > 0 ? 'navbar scrolled' : 'navbar'}>
                <div className="container-fluid">
                    <Link className="text-decoration-none" to={'/'}>
                        <Logo logo="navbar-brand" />
                    </Link>
                    <div className="show-search">
                        <SearchButton />
                    </div>
                    <div className="right-button-navbar d-flex justify-content-end align-items-center p-2">
                        <Button
                            toggle="popover"
                            title="Notification"
                            content={notificationsContent.content}
                            classname="button d-flex align-items-center"
                        >
                            <MySvgComponent
                                icon="bi-bell"
                                width={30}
                                height={30}
                            >
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </MySvgComponent>
                            <span className="badge text-bg-danger rounded-pill fs-7 me-2">
                                99+
                            </span>
                        </Button>
                        <Button
                            toggle="offcanvas"
                            target="#offcanvasRight"
                            control="offcanvasRight"
                        >
                            <MySvgComponent
                                icon="bi-person-circle"
                                width={35}
                                height={35}
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path
                                    fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                                />
                            </MySvgComponent>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
