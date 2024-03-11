import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Responsive() {
    const [user, setUser] = useState([]);
    const perPage = 7;
    const getUser = () => {
        axios
            .get('https://reqres.in/api/users', {
                params: {
                    per_page: perPage,
                },
            })
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    useEffect(() => {
        getUser();
    }, []);
    console.log(getUser);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div>
                <Slider {...settings}>
                    <div className="card">
                        <Modal />
                        <img
                            className="card-img"
                            src="https://almuhtada.org/wp-content/uploads/2024/01/Sifat-Orang-Munafik.jpg"
                            alt=""
                        />
                        <div className="bodyCard">
                            <p>My Story</p>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="btn rounded-circle m-auto"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {user.map((item) => (
                        <>
                            <Modal />
                            <Link
                                className="card"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <img
                                    className="card-img"
                                    src={item.avatar}
                                    alt={item.last_name}
                                />
                                <div className="bodyCard2">
                                    <Link className="btn rounded-circle">
                                        <img
                                            className="img-fluid"
                                            src={item.avatar}
                                            alt={item.last_name}
                                        />
                                    </Link>
                                    <em className="">{`${item.first_name} ${item.last_name}`}</em>
                                </div>
                            </Link>
                        </>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default Responsive;
