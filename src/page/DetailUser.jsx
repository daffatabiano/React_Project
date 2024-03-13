import '../style/detail-user.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const DetailUser = () => {
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const getUserDetail = () => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => {
                setUser(res);
                setUser(res?.data?.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    useEffect(() => {
        getUserDetail();
    }, []);

    return (
        <div className="parents-detail">
            <div className="card-detail">
                <h1>Detail User</h1>
                <img src={user.avatar} alt="" />
                <h3>
                    {user?.first_name} {user?.last_name}
                </h3>
                <h5>{user?.email}</h5>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
                    accusantium beatae voluptatum nostrum maxime blanditiis, est
                    adipisci neque aut optio, veniam dolor delectus commodi
                    deserunt fugiat fuga officiis quidem ipsa.
                </p>
            <button
                className="backButton mt-3 ms-3"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            </div>
        </div>
    );
};

export default DetailUser;
