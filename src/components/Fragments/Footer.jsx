import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/footer.css';
import MySvgComponent from '../Elements/MySvgComponent';
import Logo from '../Elements/Logo';
import SocialMedia from './SocialMedia';
import FooterMenu from '../Elements/FooterMenu';
import UnorderedList from '../Elements/Input/UnorderedList';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="pg-footer">
            <footer className="footer">
                <MySvgComponent
                    icon="footer-wave-svg"
                    viewBox="0 0 1200 100"
                    aspectRatio="none"
                >
                    <path
                        className="footer-wave-path"
                        d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
                    ></path>
                </MySvgComponent>
                <div className="footer-content">
                    <div className="footer-content-column">
                        <div className="footer-logo">
                            <a className="footer-logo-link" href="#">
                                <span className="hidden-link-text">
                                    Sociall .
                                </span>
                                <Logo />
                            </a>
                        </div>
                        <FooterMenu>
                            Get Started
                            <UnorderedList text="Start" />
                            <UnorderedList text="Documentation" />
                            <UnorderedList text="Installation" />
                        </FooterMenu>
                    </div>
                    <div className="footer-content-column">
                        <FooterMenu>
                            Company
                            <UnorderedList text="About Us" />
                            <UnorderedList text="Careers" />
                            <UnorderedList text="Blog" />
                        </FooterMenu>
                        <FooterMenu>
                            Legal
                            <UnorderedList text="Privacy Policy" />
                            <UnorderedList text="Terms of Use" />
                        </FooterMenu>
                    </div>
                    <div className="footer-content-column">
                        <FooterMenu>
                            Support
                            <UnorderedList text="Help Center" />
                            <UnorderedList text="Contact Us" />
                            <UnorderedList text="Status" />
                            <UnorderedList text="API" />
                            <UnorderedList text="Training" />
                            <UnorderedList text="Forums" />
                            <UnorderedList text="Security" />
                        </FooterMenu>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title">
                                {' '}
                                Lets Chat
                            </h2>
                            <p className="footer-call-to-action-description">
                                {' '}
                                Have a support question?
                            </p>
                            <a
                                className="footer-call-to-action-button button"
                                href="#"
                                target="_self"
                            >
                                {' '}
                                Get in Touch{' '}
                            </a>
                        </div>
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title">
                                {' '}
                                You Call Us
                            </h2>
                            <p className="footer-call-to-action-link-wrapper">
                                {' '}
                                <a
                                    className="footer-call-to-action-link"
                                    href="tel:089890499"
                                    target="_self"
                                >
                                    {' '}
                                    0898-9098-499{' '}
                                </a>
                            </p>
                        </div>
                    </div>
                    <SocialMedia />
                </div>
                <div className="footer-copyright">
                    <div className="footer-copyright-wrapper">
                        <p className="footer-copyright-text">
                            <a
                                className="footer-copyright-link"
                                href="#"
                                target="_self"
                            >
                                {' '}
                                &copy; {year}. | Designed By: Daffa Tabiano. |
                                All rights reserved.{' '}
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
