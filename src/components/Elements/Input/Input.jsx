/* eslint-disable react/prop-types */
import React from 'react'

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
}

export default Input