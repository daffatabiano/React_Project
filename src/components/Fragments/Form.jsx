/* eslint-disable react/prop-types */
import React from 'react';

const Form = (props) => {
    const { children, action } = props;
    return (
        <div>
            <form action={action}>{children}</form>
        </div>
    );
};

const Label = (props) => {
    const { children, htmlFor } = props;
    return <label htmlFor={htmlFor}>{children}</label>;
};
const Input = (props) => {
    const { type, name, id, placeholder } = props;
    return <input type={type} name={name} id={id} placeholder={placeholder} />;
};
const Button = (props) => {
    const { disabled, click, children } = props;
    return (
        <button onClick={click} disabled={disabled}>
            {children}
        </button>
    );
};
Form.Label = Label;
Form.Input = Input;
Form.Button = Button;

export default Form;
