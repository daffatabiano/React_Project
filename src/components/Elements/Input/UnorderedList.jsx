/* eslint-disable react/prop-types */
import React from 'react';

const UnorderedList = (props) => {
    const { text } = props;
    return (
        <div>
            <ul id="menu-get-started" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                    <a href="">{text}</a>
                </li>
            </ul>
        </div>
    );
};

export default UnorderedList;
