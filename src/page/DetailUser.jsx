import "../style/detail-user.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const DetailUser = () => {
    const [user, setUser] = useState(null);
    const  id  = useParams('')

    const getUserDetail = () => {
        axios
            .get(`https://reqres.in/api/users?${id}`)
            .then((res) => {
                setUser(res);
                console.log(res?.data?.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getUserDetail()
    }, [])

    return (
        <div className="parents-detail">
            <div className="card-detail">
                <h1>Detail User</h1>
                <img src="" alt="" />
                <h3>Nama</h3>
                <h2>Email</h2>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
                    accusantium beatae voluptatum nostrum maxime blanditiis, est
                    adipisci neque aut optio, veniam dolor delectus commodi
                    deserunt fugiat fuga officiis quidem ipsa.
                </p>
            </div>
        </div>
    );
};

export default DetailUser;
