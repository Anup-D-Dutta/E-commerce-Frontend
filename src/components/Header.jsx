
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiMenuBurger, CiUser } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { FaRegCircleUser, FaInstagram, FaFacebook } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import DisplayCartItem from "./DisplayCartItem";
import HeaderItem from "./HeaderItem";
import Search from "./Search";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import logo from "../assets/logo3.png";
import { IoMdSearch, IoMdHeartEmpty } from "react-icons/io";
import { TfiSearch } from "react-icons/tfi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import Sidebar from "./Sidebar";



const Header = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);


    const { totalPrice, totalQty, totalQtywishlist } = useGlobalContext();

    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartSection, setOpenCartSection] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);


    const redirectToLoginPage = () => {
        navigate("/login");
    };

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login");
            return;
        }
        navigate("/user");
    };

    const handleCart = () => {
        // if (!user._id) {
        //     navigate("/login");
        //     return;
        // }
        navigate("/cart");
    };


    return (

        <header
            className="h-16 p-2 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white"
        >

            {/* Main Header (Always Visible) */}
            <div className="container mx-auto flex items-center px-2 justify-between border-black">
                {/* Sidebar Toggle Button */}
                <button onClick={() => setIsSidebarOpen(true)} className="p-3 lg:hidden">
                    <IoMenu size={26} cursor={"pointer"} />
                </button>

                {/* Logo */}
                <div className="h-full">
                    <Link to={"/"} className=" flex justify-center items-center rounded-full border-black">
                        <img src={logo} alt="logo" className="hidden w-24 lg:block" />
                        <img src={logo} alt="logo" className="w-20 lg:hidden" />
                    </Link>
                </div>

                {/* Search Box (Always Visible) */}
                <div className="lg:block hidden">
                    <Search />
                </div>

                {/* User & Cart Icons (Always Visible) */}
                <div>
                    {/* Mobile User Icon */}
                    <div className="flex items-center gap-3 relative p-1">
                        {/* //Search Icon and Search Box */}
                        <div className="lg:hidden flex items-center relative">
                            {/* <IoMdSearch size={30} onClick={() => setShowSearch(!showSearch)} /> */}
                            <TfiSearch color="black" size={22} onClick={() => setShowSearch(!showSearch)} />

                            {/* Search Box (Appears without affecting layout) */}
                            <div
                                className={`${showSearch ? "absolute top-full right-[16.2rem] w-full p-7" : "hidden"} lg:block`}
                            >
                                <Search />
                            </div>
                        </div>

                        {/* Mobile User Icon */}
                        <button className="lg:hidden" onClick={handleCart}>
                            <LiaShoppingBagSolid color="black" size={26} />

                            {cartItem[0] ? (
                                <div>
                                    <span className="absolute -top-1 -right-1 bg-[#000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {totalQty}
                                        {/* <LiaShoppingBagSolid color="black" size={26} /> */}
                                    </span>
                                </div>

                            ) : (
                                <span className="absolute -top-1 -right-1 bg-[#000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {totalQty}
                                </span>
                            )}


                        </button>
                    </div>

                    {/* <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
                        <FaRegCircleUser size={26} />
                    </button> */}

                    {/* Desktop User, Wishlist & Cart */}
                    <div className="hidden lg:flex items-center gap-2">
                        {user?._id ? (
                            <div className="relative">
                                <div onClick={() => setOpenUserMenu((prev) => !prev)} className="flex select-none items-center gap-1 cursor-pointer">
                                    <CiUser size={28} color="black" fontWeight={"bold"} style={{ marginRight: "-0.5rem" }} />
                                    {openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />}
                                </div>
                                {openUserMenu && (
                                    <div className="absolute right-0 top-12">
                                        <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                                            <UserMenu close={() => setOpenUserMenu(false)} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={redirectToLoginPage} className="flex text-lg px-2 border-black">
                                <FaRegCircleUser size={24} color="black" style={{ marginRight: "0.7rem", fontWeight: "bolder", opacity: "0.7" }} />
                                Login
                            </button>
                        )}

                        {/* Wishlist Icon */}
                        {user?._id && ( // ✅ Show button only when user is logged in
                            <button onClick={() => navigate("/wishlist")} className="relative flex items-center">
                                <div className="relative">
                                    <IoMdHeartEmpty size={27} />
                                </div>

                            </button>
                        )}

                        {/* Cart Icon */}
                        <button onClick={() => setOpenCartSection(true)} className=" relative w-10 h-6 flex items-center gap-2 px-3 py-2 rounded text-black">
                            <div className="relative" style={{ opacity: "0.7" }}>
                                <LiaShoppingBagSolid color="black" size={26} />
                            </div>
                            <div style={{ opacity: "0.7" }} className="text bg-black text-white rounded-full w-4 text-center text-xs">
                                {cartItem[0] ? (
                                    <div>
                                        <span className="absolute -top-2 -right-3 bg-[#000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {totalQty}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="absolute -top-2 -right-3 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {totalQty}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search (Only for Small Screens) */}
            {/* <div className="container mx-auto px-2 lg:hidden mt-5">
                <Search />
            </div> */}

            {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}

            {/* HeaderItem (Hidden on Search Page) */}

            <div style={{ height: "3rem", width: "100%", backgroundColor: "white" }}>
                <HeaderItem />
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>}

            <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
                <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsSidebarOpen(false)}>✖</button>

                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            </div>
        </header >

    );
};

export default Header;