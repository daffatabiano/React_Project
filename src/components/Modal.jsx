import axios from 'axios';
import '../style/modal.css';
import PropTypes from 'prop-types';

// Inside the Modal component

const Modal = (props) => {
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
                    <div className="modal-content" id={props.id}>
                        <div className="modal-header">
                            <h1 className="modal-title " id="exampleModalLabel">
                                {props.first_name} {props.last_name}
                            </h1>
                        </div>
                        <div className="modal-body">
                            <img src={props.avatar} alt="" />
                            <h4></h4>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Modal.propTypes = {
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

export default Modal;
