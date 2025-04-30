import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import DisplayCartItem from "./DisplayCartItem";
import HeaderItem from "./HeaderItem";
import Search from "./Search";
import { useGlobalContext } from "../provider/GlobalProvider";
import logo from "../assets/logo2.png";
import Sidebar from "./Sidebar";
import { IoMdArrowBack } from "react-icons/io";


const Header2 = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
    const { totalPrice, totalQty, totalQtywishlist } = useGlobalContext();

    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartSection, setOpenCartSection] = useState(false);

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    const handleCart = () => {
        navigate("/cart");
    };

    return (
        <header
            className="h-16 p-2 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 lg:hidden "
            style={{ backgroundColor: "transparent" }}
        >


            {/* Main Header */}
            <div className="container mx-auto flex items-center px-2 justify-between border-black">
                {/* Back Button for Mobile */}
                <button onClick={() => navigate(-1)} className="p-3 lg:hidden">
                <IoMdArrowBack size={23} className="rounded-full w-6 bg-white h-6" />
                    {/* <span className="text-xl font-bold rounded-full w-15 h-15 bg-gray-300">&#8592;</span> */}
                </button>


                {/* User & Cart */}
                <div className="flex items-center gap-3 relative p-1">
                    {/* Wishlist Icon - Always Visible When Logged In */}
                    {user?._id && (
                        <button onClick={() => navigate("/wishlist")} className="relative flex items-center rounded-full w-9 bg-white h-9 justify-center text-center">
                            <IoMdHeartEmpty size={24} color="black" />
                        </button>
                    )}

                    {/* Cart Icon */}
                    <button className="relative rounded-full w-9 bg-white h-9 items-center justify-center text-center" onClick={handleCart}>
                        <LiaShoppingBagSolid  color="black" size={26} />
                        <span className="absolute -top-0 right-1 bg-[#000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {totalQty}
                        </span>
                    </button>
                </div>
            </div>

            {/* DisplayCartItem Modal */}
            {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}

            {/* Header Item */}
            <div style={{ height: "3rem", width: "100%", backgroundColor: "transparent" }}>
                <HeaderItem />
            </div>
        </header>
    );
}

export default Header2
