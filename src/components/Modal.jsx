import axios from 'axios';
import '../style/modal.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Modal = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams('');

    const getUserDetail = () => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => {
                setUser(res.data.data);
                console.log(res?.data?.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    useEffect(() => {
        getUserDetail();
    });
    return (
        <div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="4"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title " id="exampleModalLabel">
                            </h1>
                        </div>
                        <div className="modal-body">
                            <img src="" alt="" />
                            <h4>content</h4>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
