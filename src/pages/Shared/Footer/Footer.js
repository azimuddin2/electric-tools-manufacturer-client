import React from 'react';
import { FaGoogle, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../../assets/icons/logo.svg'
import ScrollToTop from 'react-scroll-to-top';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="px-5 lg:px-0 bg-secondary text-gray-200 pb-10 pt-20 ">
            <div className='footer max-w-screen-lg mx-auto pb-10'>
                <div>
                    <Link to={'/'}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <p className='mt-3'>Edwin Diaz is a software and web <br /> technologies engineer, a life coach <br /> trainer who is also a serial.</p>
                    <div className='flex items-center mt-4'>
                        <p className='bg-neutral-700 mr-2 p-3 rounded-full cursor-pointer'><FaGoogle></FaGoogle></p>
                        <p className='bg-neutral-700 mr-2 p-3 rounded-full cursor-pointer'><FaTwitter></FaTwitter></p>
                        <p className='bg-neutral-700 mr-2 p-3 rounded-full cursor-pointer'><FaInstagram></FaInstagram></p>
                        <p className='bg-neutral-700 mr-2 p-3 rounded-full cursor-pointer'><FaLinkedin></FaLinkedin></p>
                    </div>
                </div>
                <div>
                    <span className="footer-title text-slate-100">About</span>
                    <a href="/" className="link link-hover">Home</a>
                    <a href="/" className="link link-hover">Product</a>
                    <a href="/" className="link link-hover">Contact</a>
                    <a href="/" className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a href="/" className="link link-hover">Why Electric Tools</a>
                    <a href="/" className="link link-hover">About</a>
                    <a href="/" className="link link-hover">Blog</a>
                </div>
                <div>
                    <span className="footer-title">Support</span>
                    <a href="/" className="link link-hover">Support Center</a>
                    <a href="/" className="link link-hover">Feedback</a>
                    <a href="/" className="link link-hover">Accessibility</a>
                </div>
            </div>
            <p className='text-center'><small>Copyright © 2024 Autozpro</small></p>
            <ScrollToTop
                smooth
                className="animate-bounce flex justify-center items-center"
                color="#fff"
                width="18"
                height="18"
                top="400"
                style={{ background: "#4158f3", boxShadow: 'none', borderRadius: "50px" }}
            />
        </footer>
    );
};

export default Footer;