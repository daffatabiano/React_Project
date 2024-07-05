/* eslint-disable react/prop-types */

const Form = (props) => {
    const { children, action } = props;
    return (
        <form
            action={action}
            style={{
                width: '100%',
                padding: '0 80px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </form>
    );
};

const Label = (props) => {
    const { children, htmlFor } = props;
    return <label htmlFor={htmlFor}>{children}</label>;
};
const Input = (props) => {
    const { type, name, id, placeholder } = props;
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            style={{ backgroundColor: 'red', width: '100%' }}
        />
    );
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
