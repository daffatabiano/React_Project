import axios from 'axios';
import '../style/modal.css';
import { handleLogin } from '../utils/api';
import { useEffect } from 'react';
const Modal = (props) => {
    const { firstname, lastname, image } = props;
    let { id } = props;

    useEffect(() => {
        handleLogin({ id });
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
                                {firstname} {lastname}
                            </h1>
                        </div>
                        <div className="modal-body">
                            <img src={image} alt="" />
                            <h4></h4>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
