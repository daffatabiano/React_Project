import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div>
            <p>
                Copyright {year} | <Link>Daffa Tabiano</Link>
            </p>
        </div>
    );
};

export default Footer;
