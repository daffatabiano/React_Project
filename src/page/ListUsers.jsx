import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchButton from '../components/SearchButton';
import Navbar from '../components/Navbar';
import '../style/list.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ListUsers = () => {
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        per_page: 6,
        total: 12,
        total_pages: 2,
    });

    const getListUsers = () => {
        axios
            .get(`https://reqres.in/api/users?page=${pagination.page}`)
            .then((res) => {
                setPagination({
                    page: res.data.page,
                    per_page: res.data.per_page,
                    total: res.data.total,
                    total_pages: res.data.total_pages,
                });
                setListUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    const handleBack = () => {
        setPagination({
            ...pagination,
            page: pagination.page - 1,
        });
    };
    const handleNext = () => {
        setPagination({
            ...pagination,
            page: pagination.page + 1,
        });
    };
    useEffect(() => {
        getListUsers();
    }, [pagination.page]);
    useEffect(() => {
        console.log(pagination);
    }, [pagination]);

    return (
        <div className="main-page">
            <Navbar />
            <div className="container-list-friends">
                <div className="logo-pack">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        className="bi bi-people"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                    </svg>
                    <h1>Connection</h1>
                </div>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                        >
                            All Friends
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                        >
                            Close Friends
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="request-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#request"
                            type="button"
                            role="tab"
                            aria-controls="request"
                            aria-selected="false"
                        >
                            Request
                            <span className="badge rounded-pill text-bg-danger m-1">
                                9
                            </span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#contact"
                            type="button"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false"
                        >
                            Others
                        </button>
                    </li>
                </ul>
                <section className="list-friends">
                    <div className="tab-content" id="myTabContent">
                        <div
                            className="tab-pane fade show active d-flex flex-column"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                        >
                            <div className="list-friends row">
                                {listUsers.map((user) => {
                                    return (
                                        <>
                                            <Link
                                                className="list-friends-item col-lg-6 text-decoration-none text-white"
                                                to={'/detail'}
                                            >
                                                <div className="list-friends-item-img">
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.first_name}
                                                    />
                                                </div>
                                                <div className="list-friends-item-info">
                                                    <div className="list-friends-item-name d-flex flex-column ">
                                                        <h3>
                                                            {user.first_name}{' '}
                                                            {user.last_name}
                                                        </h3>
                                                        <p>{user.email}</p>
                                                    </div>
                                                    <div className="dropend">
                                                        <button
                                                            type="button"
                                                            className="btn-popover dropdown-toggle dropdown-toggle-split"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <p>. . .</p>
                                                            <ul className="dropdown-menu ">
                                                                <li className="dropdown-item text-decoration-none">
                                                                    <Link className="text-success d-flex align-items-center text-decoration-none p-1">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="currentColor"
                                                                            className="bi bi-pencil me-2"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                                        </svg>
                                                                        Edit
                                                                        Name
                                                                    </Link>
                                                                </li>
                                                                <li className="dropdown-item text-decoration-none">
                                                                    <Link className="text-success d-flex align-items-center text-decoration-none p-1">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="currentColor"
                                                                            className="bi bi-star me-2"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                                                        </svg>
                                                                        Add
                                                                        Close-Friends
                                                                    </Link>
                                                                </li>
                                                                <li className="dropdown-item text-decoration-none">
                                                                    <Link className="text-success d-flex align-items-center text-decoration-none p-1">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="currentColor"
                                                                            className="bi bi-person-dash me-2"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                                                        </svg>
                                                                        Unfollow
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <hr className="dropdown-divider" />
                                                                </li>
                                                                <li className="dropdown-item ">
                                                                    <Link className="text-danger d-flex align-items-center text-decoration-none">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="currentColor"
                                                                            className="bi bi-ban me-2"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                                                        </svg>
                                                                        Block
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    );
                                })}
                            </div>

                            <nav aria-label="...">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            disabled={pagination.page === 1}
                                            onClick={handleBack}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            {pagination.total_pages - 1}
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <Link
                                            className="page-link"
                                            disabled={!pagination.page}
                                            aria-current={'page'}
                                        >
                                            {pagination.total_pages}
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link
                                            className="page-link"
                                            disabled={!pagination.page}
                                            onClick={handleNext}
                                        >
                                            Next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ListUsers;
