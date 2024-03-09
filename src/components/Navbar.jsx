import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../style/navbar.css";
import Sidebar from "./Sidebar";
import SearchButton from "./SearchButton";

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    //fungsi untuk mengubah warna ketika halaman di scroll;
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    //mengatur event listener 
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    });

    // mengaktifkan popover
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


    return (
        <nav className="navbar">
            <Sidebar />
            <div className={scrollPosition > 0 ? "navbar scrolled" : "navbar"}>
            <div className="container-fluid">
                <h1 className="navbar-brand">soci<span>all</span></h1>
                <SearchButton />
                <div className="d-flex justify-content-end align-items-center p-2">
                    <button type="button" className="button"
                        data-bs-toggle="popover"  data-bs-custom-class="custom-popover" data-bs-title="Notifications" data-bs-content="And here's some amazing content. It's very engaging. Right?"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg><span className="badge text-bg-danger rounded-pill">99+</span></button>
                    <button className="button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg></button>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;