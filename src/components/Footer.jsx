// import React from 'react'
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//     return (
//         <footer className='border-t bg-black'>
//             <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
//                 <p className='text-white'>© 2025, New balance.</p>
//                 <div className='text-white mx-auto flex flex-col text-start lg:justify-between'>
//                     <ul className=''>
//                         <li>d</li>
//                         <li></li>
//                     </ul>
//                 </div>

//                 <div className='flex-col items-center gap-4 text-xl'>
//                     <div style={{ fontSize: '1.2rem', fontWeight: 'bold ' }}>
//                         <p className='text-white'>OUR SOCIALS</p>
//                     </div>

//                     <div className='flex items-center gap-4 justify-center'>
//                         <a href='' className='hover:text-primary-100'>
//                             <FaFacebook color='white' />
//                         </a>
//                         <a href='' className='hover:text-primary-100'>
//                             <FaInstagram color='white' />
//                         </a>
//                         <a href='' className='hover:text-primary-100'>
//                             <FaLinkedin color='white' />
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer

import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-16 mb-8 lg:mb-0">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* INFO SECTION */}
        <div>
          <h3 className="font-bold mb-6 text-xl">INFO</h3>
          <ul className="space-y-6">
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Contact Us</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Releases</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Stores</a></li>
            <li><a href="/brands" className="lg:hover:text-gray-400 text-gray-300">Brands</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Blogs</a></li>
          </ul>
        </div>

        {/* POLICIES SECTION */}
        <div>
          <h3 className="font-bold mb-6 text-xl">POLICIES</h3>
          <ul className="space-y-6">
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Help Center</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Privacy Policy</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Returns & Exchange</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Terms & Conditions</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Order & Shipping</a></li>
            <li><a href="#" className="lg:hover:text-gray-400 text-gray-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* SOCIALS SECTION #1 */}
        {/* <div>
          <h3 className="font-bold mb-3">OUR SOCIALS</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </div>
        </div> */}

        {/* SOCIALS SECTION #2 (Replacing Newsletter) */}
        <div>
          <h3 className="font-bold mb-3 text-xl">FOLLOW US</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        <div>
          <p className='text-white'>© 2025, New balance.</p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
