import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
                <p>© 2025, New balance.</p>

                <div className='flex-col items-center gap-4 text-2xl'>
                    <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        <p>OUR SOCIALS</p>
                    </div>

                    <div className='flex items-center gap-4 justify-center'>
                        <a href='' className='hover:text-primary-100'>
                            <FaFacebook />
                        </a>
                        <a href='' className='hover:text-primary-100'>
                            <FaInstagram />
                        </a>
                        <a href='' className='hover:text-primary-100'>
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
