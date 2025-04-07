
import React, { useState } from "react";
import { HomeIcon, Squares2X2Icon, UserIcon, HeartIcon } from "@heroicons/react/24/solid";
import { AiOutlineHome } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { CiUser } from "react-icons/ci";

const BottomNavBar = () => {
    const [selected, setSelected] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
    const user = useSelector((state) => state?.user);

    return (
        <>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg rounded-t-xl">
                <div className="flex justify-around py-3">

                    {/* Home */}
                    <Link to="/" onClick={() => setSelected(0)}>
                        <button className={`p-2 `}>
                            <AiOutlineHome size={24} className=" text-gray-700" />
                        </button>
                    </Link>

                    {/* Wishlist */}
                    <Link to="/wishlist" onClick={() => setSelected(1)}>
                        <button className={`p-2`}>
                            <FiHeart size={23} className=" text-gray-700" />
                        </button>
                    </Link>

                    {/* Category Button (Opens Sidebar) */}
                    <button 
                        className={`p-2 `} 
                        onClick={() => { setSelected(2); setIsSidebarOpen(true); }}
                    >
                        <Squares2X2Icon className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Profile */}
                    <div>
                        {user?._id ? (
                            <Link to="/user" >
                                <button className={`p-2 ${selected === 3}`}>
                                    <UserIcon className="w-6 h-6 text-gray-700" />
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login" >
                                <button className={`p-2 ${selected === 3}`}>
                                    <UserIcon className="w-6 h-6 text-gray-700" />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
                <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsSidebarOpen(false)}>✖</button>
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
        </>
    );
};

export default BottomNavBar;
