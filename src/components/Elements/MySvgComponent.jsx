/* eslint-disable react/prop-types */
import React from 'react';

const MySvgComponent = (props) => {
    const { icon, children, width, height, viewBox = '0 0 16 16', aspectRatio="none", color } = props;
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className={icon}
                viewBox={viewBox}
                preserveAspectRatio={aspectRatio}
            >
                {children}
            </svg>
        </div>
    );
};

export default MySvgComponent;
