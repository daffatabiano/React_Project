import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Responsive() {
    const [user, setUser] = useState([]);
    // const perPage = 7;
    const getUser = () => {
        axios
            .get('https://reqres.in/api/users')
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
        <Slider {...settings}>
            {user.map((data) => {
                return (
                    <div key={data}>
                        <Link
                            to={{
                                pathname: '/detail',
                                state: { data },
                            }}
                        >
                            <img src={data.avatar} alt="avatar" />
                            <Modal />
                        </Link>
                    </div>
                );
            })}
        </Slider>
    );
}

export default Responsive;
