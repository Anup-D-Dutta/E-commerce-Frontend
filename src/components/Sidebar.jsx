import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiMenuBurger, CiUser } from "react-icons/ci";
import { IoMdSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaRegCircleUser, FaInstagram, FaFacebook } from "react-icons/fa6";


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {  // Receive props
    const user = useSelector((state) => state?.user);

    return (
        <nav className="mt-16 p-6">
            <ul className="space-y-4 text-lg">
                <li className="cursor-pointer">
                    <Link to={'/'} onClick={() => setIsSidebarOpen(false)}>Home</Link>
                </li>
                <li className="cursor-pointer">
                    <Link to={'/shoes'} onClick={() => setIsSidebarOpen(false)}>Shoes</Link>
                </li>
                <li className="cursor-pointer">
                    <Link to={'/clothes'} onClick={() => setIsSidebarOpen(false)}>Clothes</Link>
                </li>
                <li className="cursor-pointer">
                    <Link to={'/sunglasses'} onClick={() => setIsSidebarOpen(false)}>Sunglasses</Link>
                </li>
                <li className="cursor-pointer">
                    <Link to={'/watches'} onClick={() => setIsSidebarOpen(false)}>Watches</Link>
                </li>
                <li className="cursor-pointer">
                    <Link to={'/brands'} onClick={() => setIsSidebarOpen(false)}>Brands</Link>
                </li>
            </ul>

            {/* Account Section */}
            <div className="mt-24 border-t pt-4">
                {user?._id ? (
                    <Link to={'/user'} onClick={() => setIsSidebarOpen(false)}>
                        <div className="flex gap-2">
                            <CiUser size={25} />
                            <p className="font-bold">My Account</p>
                        </div>
                    </Link>
                ) : (
                    <Link to={'/login'} onClick={() => setIsSidebarOpen(false)}>
                        <div className="flex gap-2">
                            <CiUser size={25} />
                            <p className="font-bold">Log in</p>
                        </div>
                    </Link>
                )}
            </div>

            {/* Wishlist */}
            <div className="mt-6 pt-4">
                <Link to={'/wishlist'} onClick={() => setIsSidebarOpen(false)}>
                    <div className="flex gap-2">
                        <IoMdHeartEmpty size={25} />
                        <h1 className="text-base font-bold">Wishlist</h1>
                    </div>
                </Link>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
                <FaFacebook className="text-xl cursor-pointer" />
                <FaInstagram className="text-xl cursor-pointer" />
            </div>
        </nav>
    );
};

export default Sidebar;


// export default Sidebar
