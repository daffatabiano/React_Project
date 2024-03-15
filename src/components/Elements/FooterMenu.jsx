/* eslint-disable react/prop-types */
import React from 'react';
import UnorderedList from './Input/UnorderedList';

const FooterMenu = (props) => {
    const { children, text } = props;
    return (
        <div>
            <div className="footer-menu">
                <h2 className="footer-menu-name"> {children}</h2>
                <UnorderedList text={text} />
            </div>
        </div>
    );
};

export default FooterMenu;
