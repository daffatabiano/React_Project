/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Button = (props) => {
    // mengaktifkan popover
    const popoverTriggerList = document.querySelectorAll(
        '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
        (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );
    const {
        type = 'button',
        classname = 'button',
        toggle,
        title,
        content,
        children,
        target,
        control,
    } = props;
    return (
        <div>
            <button
                type={type}
                className={classname}
                data-bs-toggle={toggle}
                data-bs-title={title}
                data-bs-content={content}
                data-bs-target={target}
                aria-controls={control}
            >
                {children}
            </button>
        </div>
    );
};

const Popover = () => {
    return (
        <div>
            <Button data-bs-custom-class="custom-popover"/>
        </div>
    );
};

Button.Popover = Popover;

export default Button;
