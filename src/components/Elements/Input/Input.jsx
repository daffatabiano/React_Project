/* eslint-disable react/prop-types */

const Input = (props) => {
    const { classname, type, placeholder, label } = props;
    return (
        <div>
            <input
                className={classname}
                type={type}
                placeholder={placeholder}
                aria-label={label}
            />
        </div>
    );
};

export default Input;
