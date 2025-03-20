
import React, { useState } from "react";
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
import logo from "../assets/logo2.png";
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

    const { totalPrice, totalQty } = useGlobalContext();

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

    return (

        <header className="h-16 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
            {/* Main Header (Always Visible) */}
            <div className="container mx-auto flex items-center px-2 justify-between border-black">
                {/* Sidebar Toggle Button */}
                <button onClick={() => setIsSidebarOpen(true)} className="p-3 lg:hidden">
                    <IoMenu size={26} cursor={"pointer"} />
                </button>

                {/* Logo */}
                <div className="h-full">
                    <Link to={"/"} className="h-full flex justify-center items-center">
                        <img src={logo} width={120} height={60} alt="logo" className="hidden lg:block" style={{ marginRight: "3rem" }} />
                        <img src={logo} width={80} height={60} alt="logo" className="lg:hidden" />
                    </Link>
                </div>

                {/* Search Box (Always Visible) */}
                <div className="lg:block hidden">
                    <Search />
                </div>

                {/* User & Cart Icons (Always Visible) */}
                <div>
                    {/* Mobile User Icon */}
                    <div className="flex items-center gap-3 relative">
                        {/* //                     Search Icon and Search Box */}
                        <div className="lg:hidden flex items-center relative">
                            <IoMdSearch size={30} onClick={() => setShowSearch(!showSearch)} />

                            {/* Search Box (Appears without affecting layout) */}
                            <div
                                className={`${showSearch ? "absolute top-full right-[16.2rem] w-full p-7" : "hidden"} lg:block`}
                            >
                                <Search />
                            </div>
                        </div>

                        {/* Mobile User Icon */}
                        <button className="lg:hidden" onClick={handleMobileUser}>
                            <FaRegCircleUser size={26} />
                        </button>
                    </div>

                    {/* <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
                        <FaRegCircleUser size={26} />
                    </button> */}

                    {/* Desktop User & Cart */}
                    <div className="hidden lg:flex items-center gap-10">
                        {user?._id ? (
                            <div className="relative">
                                <div onClick={() => setOpenUserMenu((prev) => !prev)} className="flex select-none items-center gap-1 cursor-pointer">
                                    <CiUser size={30} color="black" fontWeight={"bold"} style={{ marginRight: "-0.5rem" }} />
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
                                <FaRegCircleUser size={24} color="black" style={{ marginRight: "0.7rem", fontWeight: "lighter", opacity: "0.7" }} />
                                Login
                            </button>
                        )}

                        {/* Wishlist Icon */}
                        {/* <button onClick={() => navigate("/wishlist")} className="relative flex items-center">
                            <FaRegHeart size={26} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </button> */}
                        {user?._id && ( // ✅ Show button only when user is logged in
                            <button onClick={() => navigate("/wishlist")} className="relative flex items-center">
                                <FaRegHeart size={26} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </button>
                        )}

                        <button onClick={() => setOpenCartSection(true)} className="flex items-center gap-2 px-3 py-2 rounded text-black">
                            <div className="animate-bounce" style={{ opacity: "0.7" }}>
                                <BsCart4 size={26} />
                            </div>
                            <div style={{ opacity: "0.7" }} className="text">
                                {cartItem[0] ? (
                                    <div>
                                        <p>{totalQty} Items</p>
                                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                                    </div>
                                ) : (
                                    <p>My Cart</p>
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

            {/* Sidebar Menu */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
                <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsSidebarOpen(false)}>✖</button>
                <nav className="mt-16 p-6">
                    <ul className="space-y-4 text-lg">
                        <li className="cursor-pointer">
                            <Link to={'/'} onClick={() => setIsSidebarOpen(false)}>Home</Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link to={'/shoes'} onClick={() => setIsSidebarOpen(false)}>Shoes</Link>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            <Link to={'/clothes'} onClick={() => setIsSidebarOpen(false)}>Clothes</Link>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            <Link to={'/sunglasses'} onClick={() => setIsSidebarOpen(false)}>Sunglasses</Link>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            <Link to={'/watches'} onClick={() => setIsSidebarOpen(false)}>Watches</Link>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            <Link to={'/brands'} onClick={() => setIsSidebarOpen(false)}>Brands</Link>
                        </li>
                    </ul>
                    <div className="mt-10 border-t pt-4">
                        <Link to={'/user'} onClick={() => setIsSidebarOpen(false)}>
                            <p className="font-bold">⚡ My Account</p>
                        </Link>

                        <Link to={'/wishlist'} onClick={() => setIsSidebarOpen(false)}>
                            <p className="mt-2">♡ Wishlist</p>
                        </Link>
                        {/* <p className="mt-2">♡ Wishlist</p> */}
                        <div className="flex gap-4 mt-4">
                            <FaFacebook className="text-xl cursor-pointer" />
                            <FaInstagram className="text-xl cursor-pointer" />
                        </div>
                    </div>
                </nav>
            </div>
        </header >



    );
};

export default Header;



// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { CiMenuBurger, CiUser } from "react-icons/ci";
// import { IoMenu } from "react-icons/io5";
// import { FaRegCircleUser, FaInstagram, FaFacebook, FaHeart } from "react-icons/fa6";
// import { BsCart4 } from "react-icons/bs";
// import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
// import UserMenu from "./UserMenu";
// import DisplayCartItem from "./DisplayCartItem";
// import HeaderItem from "./HeaderItem";
// import Search from "./Search";
// import { useGlobalContext } from "../provider/GlobalProvider";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import logo from "../assets/logo2.png";
// import { IoMdSearch } from "react-icons/io";
// import { FaRegHeart } from "react-icons/fa";

// const Header = () => {
//     const location = useLocation();
//     const isSearchPage = location.pathname === "/search";
//     const navigate = useNavigate();
//     const user = useSelector((state) => state?.user);
//     const cartItem = useSelector((state) => state.cartItem.cart);
//     const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
//     const { totalPrice, totalQty } = useGlobalContext();

//     const [openUserMenu, setOpenUserMenu] = useState(false);
//     const [openCartSection, setOpenCartSection] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [showSearch, setShowSearch] = useState(false);

//     const redirectToLoginPage = () => {
//         navigate("/login");
//     };

//     const handleMobileUser = () => {
//         if (!user._id) {
//             navigate("/login");
//             return;
//         }
//         navigate("/user");
//     };

//     return (
//         <header className="h-16 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
//             {/* Main Header (Always Visible) */}
//             <div className="container mx-auto flex items-center px-2 justify-between border-black">
//                 {/* Sidebar Toggle Button */}
//                 <button onClick={() => setIsSidebarOpen(true)} className="p-3 lg:hidden">
//                     <IoMenu size={26} cursor={"pointer"} />
//                 </button>

//                 {/* Logo */}
//                 <div className="h-full">
//                     <Link to={"/"} className="h-full flex justify-center items-center">
//                         <img src={logo} width={120} height={60} alt="logo" className="hidden lg:block" style={{ marginRight: "3rem" }} />
//                         <img src={logo} width={80} height={60} alt="logo" className="lg:hidden" />
//                     </Link>
//                 </div>

//                 {/* Search Box (Always Visible) */}
//                 <div className="lg:block hidden">
//                     <Search />
//                 </div>

//                 {/* User, Wishlist & Cart Icons */}
//                 <div className="flex items-center gap-5">
//                     {/* Search Icon (Mobile) */}
//                     <div className="lg:hidden flex items-center relative">
//                         <IoMdSearch size={30} onClick={() => setShowSearch(!showSearch)} />
//                         {showSearch && (
//                             <div className="absolute top-full right-[16.2rem] w-full p-7">
//                                 <Search />
//                             </div>
//                         )}
//                     </div>

//                     {/* Wishlist Icon */}
//                     <button onClick={() => navigate("/wishlist")} className="relative flex items-center">
//                         <FaRegHeart size={26}/>
//                         {wishlistItems.length > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                                 {wishlistItems.length}
//                             </span>
//                         )}
//                     </button>

//                     {/* User Icon */}
//                     {user?._id ? (
//                         <div className="relative">
//                             <div onClick={() => setOpenUserMenu((prev) => !prev)} className="flex select-none items-center gap-1 cursor-pointer">
//                                 <CiUser size={30} color="black" fontWeight={"bold"} style={{ marginRight: "-0.5rem" }} />
//                                 {openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />}
//                             </div>
//                             {openUserMenu && (
//                                 <div className="absolute right-0 top-12">
//                                     <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
//                                         <UserMenu close={() => setOpenUserMenu(false)} />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <button onClick={redirectToLoginPage} className="flex text-lg px-2 border-black">
//                             <FaRegCircleUser size={24} color="black" style={{ marginRight: "0.7rem", fontWeight: "lighter", opacity: "0.7" }} />
//                             Login
//                         </button>
//                     )}

//                     {/* Cart Icon */}
//                     <button onClick={() => setOpenCartSection(true)} className="flex items-center gap-2 px-3 py-2 rounded text-black">
//                         <div className="animate-bounce" style={{ opacity: "0.7" }}>
//                             <BsCart4 size={26} />
//                         </div>
//                         <div style={{ opacity: "0.7" }} className="text">
//                             {cartItem[0] ? (
//                                 <div>
//                                     <p>{totalQty} Items</p>
//                                     <p>{DisplayPriceInRupees(totalPrice)}</p>
//                                 </div>
//                             ) : (
//                                 <p>My Cart</p>
//                             )}
//                         </div>
//                     </button>
//                 </div>
//             </div>

//             {/* Sidebar Menu */}
//             {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>}

//             <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
//                 <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsSidebarOpen(false)}>✖</button>
//                 <nav className="mt-16 p-6">
//                     <ul className="space-y-4 text-lg">
//                         <li className="cursor-pointer"><Link to={'/'} onClick={() => setIsSidebarOpen(false)}>Home</Link></li>
//                         <li className="cursor-pointer"><Link to={'/shoes'} onClick={() => setIsSidebarOpen(false)}>Shoes</Link></li>
//                         <li className="cursor-pointer"><Link to={'/clothes'} onClick={() => setIsSidebarOpen(false)}>Clothes</Link></li>
//                         <li className="cursor-pointer"><Link to={'/sunglasses'} onClick={() => setIsSidebarOpen(false)}>Sunglasses</Link></li>
//                         <li className="cursor-pointer"><Link to={'/watches'} onClick={() => setIsSidebarOpen(false)}>Watches</Link></li>
//                         <li className="cursor-pointer"><Link to={'/brands'} onClick={() => setIsSidebarOpen(false)}>Brands</Link></li>
//                     </ul>
//                     <div className="mt-10 border-t pt-4">
//                         <Link to={'/user'} onClick={() => setIsSidebarOpen(false)}>
//                             <p className="font-bold">⚡ My Account</p>
//                         </Link>
//                         <Link to={'/wishlist'} onClick={() => setIsSidebarOpen(false)}>
//                             <p className="mt-2">♡ Wishlist ({wishlistItems.length})</p>
//                         </Link>
//                     </div>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// export default Header;
