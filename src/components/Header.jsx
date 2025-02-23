// import React, { useEffect, useState } from 'react'
// // import logo from '../assets/logo.png'
// import logo from '../assets/logo2.png'
// import { CiUser } from "react-icons/ci";
// import Search from './Search'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { FaRegCircleUser } from "react-icons/fa6";
// import useMobile from '../hooks/useMobile';
// import { BsCart4 } from "react-icons/bs";
// import { useSelector } from 'react-redux';
// import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
// import UserMenu from './UserMenu';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import DisplayCartItem from './DisplayCartItem';
// import HeaderItem from './HeaderItem';
// import { CiMenuBurger } from "react-icons/ci";

// const Header = () => {
//     const [isMobile] = useMobile()
//     const location = useLocation()
//     const isSearchPage = location.pathname === "/search"
//     const navigate = useNavigate()
//     const user = useSelector((state) => state?.user)
//     const [openUserMenu, setOpenUserMenu] = useState(false)
//     const cartItem = useSelector(state => state.cartItem.cart)
//     // const [totalPrice,setTotalPrice] = useState(0)
//     // const [totalQty,setTotalQty] = useState(0)
//     const { totalPrice, totalQty } = useGlobalContext()
//     const [openCartSection, setOpenCartSection] = useState(false)

//     const redirectToLoginPage = () => {
//         navigate("/login")
//     }

//     const handleCloseUserMenu = () => {
//         setOpenUserMenu(false)
//     }

//     const handleMobileUser = () => {
//         if (!user._id) {
//             navigate("/login")
//             return
//         }

//         navigate("/user")
//     }

//     //total item and total price
//     // useEffect(()=>{
//     //     const qty = cartItem.reduce((preve,curr)=>{
//     //         return preve + curr.quantity
//     //     },0)
//     //     setTotalQty(qty)

//     //     const tPrice = cartItem.reduce((preve,curr)=>{
//     //         return preve + (curr.productId.price * curr.quantity)
//     //     },0)
//     //     setTotalPrice(tPrice)

//     // },[cartItem])

//     return (
//         <header className='h-24 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
//             {
//                 !(isSearchPage && isMobile) && (
//                     <div className='container mx-auto flex items-center px-2 justify-between'>
//                         <div>
//                             <CiMenuBurger size={26} cursor={'pointer'}/>
//                         </div>
//                         {/**logo */}
//                         <div className='h-full'>
//                             <Link to={"/"} className='h-full flex justify-center items-center'>
//                                 <img
//                                     src={logo}
//                                     width={120}
//                                     height={60}
//                                     alt='logo'
//                                     className='hidden lg:block'
//                                     style={{ marginRight: '3rem' }}
//                                 />
//                                 <img
//                                     src={logo}
//                                     width={80}
//                                     height={60}
//                                     alt='logo'
//                                     className='lg:hidden'
//                                 />
//                             </Link>
//                         </div>

//                         {/**Search */}
//                         <div className='hidden lg:block'>
//                             <Search />
//                         </div>


//                         {/**login and my cart */}
//                         <div className=''>
//                             {/**user icons display in only mobile version**/}
//                             <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
//                                 <FaRegCircleUser size={26} />
//                             </button>

//                             {/**Desktop**/}
//                             <div className='hidden lg:flex  items-center gap-10'>
//                                 {
//                                     user?._id ? (
//                                         <div className='relative'>
//                                             <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
//                                                 {/* <p>Account</p> */}
//                                                 <CiUser size={30} color='black' fontWeight={'bold'} style={{ marginRight: '-0.5rem' }} />

//                                                 {
//                                                     openUserMenu ? (
//                                                         <GoTriangleUp size={25} />
//                                                     ) : (
//                                                         <GoTriangleDown size={25} />
//                                                     )
//                                                 }

//                                             </div>
//                                             {
//                                                 openUserMenu && (
//                                                     <div className='absolute right-0 top-12'>
//                                                         <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
//                                                             <UserMenu close={handleCloseUserMenu} />
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             }

//                                         </div>
//                                     ) : (
//                                         <button onClick={redirectToLoginPage} className='flex text-lg px-2'>
//                                             <FaRegCircleUser size={24} color='black' style={{ marginRight: '0.7rem', fontWeight: 'lighter', opacity: '0.7' }} />

//                                             Login</button>
//                                     )
//                                 }
//                                 <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2  px-3 py-2 rounded text-black'>
//                                     {/**add to card icons */}
//                                     <div className='animate-bounce' style={{ opacity: '0.7' }}>
//                                         <BsCart4 size={26} />
//                                     </div>
//                                     <div style={{ opacity: '0.7' }} className='text-lg'>
//                                         {
//                                             cartItem[0] ? (
//                                                 <div>
//                                                     <p>{totalQty} Items</p>
//                                                     <p>{DisplayPriceInRupees(totalPrice)}</p>
//                                                 </div>
//                                             ) : (
//                                                 <p>My Cart</p>
//                                             )
//                                         }
//                                     </div>

//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }

//             <div className='container mx-auto px-2 lg:hidden'>
//                 <Search />
//             </div>

//             {
//                 openCartSection && (
//                     <DisplayCartItem close={() => setOpenCartSection(false)} />
//                 )
//             }

//             {/*---------------- HeaderItem -----------*/}
//             <div style={{ height: '3rem', width: '100%', backgroundColor: 'white' }} >
//                 <HeaderItem />
//             </div>
//         </header>
//     )
// }

// export default Header




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

const Header = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();

    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartSection, setOpenCartSection] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <header className="h-24 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
            {!isSearchPage && (
                <div className=" container mx-auto flex items-center px-2 justify-between border-black">
                    {/* Sidebar Toggle Button */}
                    <button onClick={() => setIsSidebarOpen(true)} className="p-3 lg:hidden">
                        <IoMenu size={26} cursor={"pointer"} />
                    </button>

                    {/* Logo */}
                    <div className="h-full">
                        <Link to={"/"} className="h-full flex justify-center items-center">
                            <img
                                src={logo}
                                width={120}
                                height={60}
                                alt="logo"
                                className="hidden lg:block"
                                style={{ marginRight: "3rem" }}
                            />
                            <img
                                src={logo}
                                width={80}
                                height={60}
                                alt="logo"
                                className="lg:hidden"
                            />
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="lg:block hidden">
                        <Search />
                    </div>

                    {/* User & Cart Icons */}
                    <div>
                        {/* Mobile User Icon */}
                        <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
                            <FaRegCircleUser size={26} />
                        </button>

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
            )}

            {/* Mobile Search */}
            <div className="container mx-auto px-2 lg:hidden mt-5">
                <Search />
            </div>

            {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}

            {/* HeaderItem */}
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

                    {/* Account Section */}
                    <div className="mt-10 border-t pt-4">
                        <Link to={'/user'} onClick={() => setIsSidebarOpen(false)}>
                            <p className="font-bold">⚡ My Account</p>
                        </Link>
                        {/* <p className="font-bold">⚡ My Account</p> */}
                        <p className="mt-2">♡ Wishlist</p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4">
                            <FaFacebook className="text-xl cursor-pointer" />
                            <FaInstagram className="text-xl cursor-pointer" />
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        // <header className="h-24 lg:h-36 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
        //     {/* Main Header (Always Visible) */}
        //     <div className="container mx-auto flex items-center px-2 justify-between border-black">
        //         {/* Sidebar Toggle Button */}
        //         <button onClick={() => setIsSidebarOpen(true)} className="p-3 lg:hidden">
        //             <IoMenu size={26} cursor={"pointer"} />
        //         </button>

        //         {/* Logo */}
        //         <div className="h-full">
        //             <Link to={"/"} className="h-full flex justify-center items-center">
        //                 <img src={logo} width={120} height={60} alt="logo" className="hidden lg:block" style={{ marginRight: "3rem" }} />
        //                 <img src={logo} width={80} height={60} alt="logo" className="lg:hidden" />
        //             </Link>
        //         </div>

        //         {/* Search Box (Always Visible) */}
        //         <div className="lg:block hidden">
        //             <Search />
        //         </div>

        //         {/* User & Cart Icons (Always Visible) */}
        //         <div>
        //             {/* Mobile User Icon */}
        //             <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
        //                 <FaRegCircleUser size={26} />
        //             </button>

        //             {/* Desktop User & Cart */}
        //             <div className="hidden lg:flex items-center gap-10">
        //                 {user?._id ? (
        //                     <div className="relative">
        //                         <div onClick={() => setOpenUserMenu((prev) => !prev)} className="flex select-none items-center gap-1 cursor-pointer">
        //                             <CiUser size={30} color="black" fontWeight={"bold"} style={{ marginRight: "-0.5rem" }} />
        //                             {openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />}
        //                         </div>
        //                         {openUserMenu && (
        //                             <div className="absolute right-0 top-12">
        //                                 <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
        //                                     <UserMenu close={() => setOpenUserMenu(false)} />
        //                                 </div>
        //                             </div>
        //                         )}
        //                     </div>
        //                 ) : (
        //                     <button onClick={redirectToLoginPage} className="flex text-lg px-2 border-black">
        //                         <FaRegCircleUser size={24} color="black" style={{ marginRight: "0.7rem", fontWeight: "lighter", opacity: "0.7" }} />
        //                         Login
        //                     </button>
        //                 )}

        //                 <button onClick={() => setOpenCartSection(true)} className="flex items-center gap-2 px-3 py-2 rounded text-black">
        //                     <div className="animate-bounce" style={{ opacity: "0.7" }}>
        //                         <BsCart4 size={26} />
        //                     </div>
        //                     <div style={{ opacity: "0.7" }} className="text">
        //                         {cartItem[0] ? (
        //                             <div>
        //                                 <p>{totalQty} Items</p>
        //                                 <p>{DisplayPriceInRupees(totalPrice)}</p>
        //                             </div>
        //                         ) : (
        //                             <p>My Cart</p>
        //                         )}
        //                     </div>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Mobile Search (Only for Small Screens) */}
        //     <div className="container mx-auto px-2 lg:hidden mt-5">
        //         <Search />
        //     </div>

        //     {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}

        //     {/* HeaderItem (Hidden on Search Page) */}
        //     {isSearchPage  &&  (
        //         <div style={{ height: "3rem", width: "100%", backgroundColor: "white" }}>
        //             <HeaderItem />
        //         </div>
        //     )}

        //     {/* Sidebar Overlay */}
        //     {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>}

        //     {/* Sidebar Menu */}
        //     <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
        //         <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsSidebarOpen(false)}>✖</button>
        //         <nav className="mt-16 p-6">
        //             <ul className="space-y-4 text-lg">
        //                 <li className="cursor-pointer">Shoes</li>
        //                 <li className="cursor-pointer flex justify-between">Clothes </li>
        //                 <li className="cursor-pointer flex justify-between">Sunglasses</li>
        //                 <li className="cursor-pointer flex justify-between">Watches</li>
        //                 <li className="cursor-pointer flex justify-between">
        //                     <Link to={'/brands'} onClick={() => setIsSidebarOpen(false)}>Brands</Link>
        //                 </li>
        //             </ul>
        //             <div className="mt-10 border-t pt-4">
        //                 <Link to={'/user'} onClick={() => setIsSidebarOpen(false)}>
        //                     <p className="font-bold">⚡ My Account</p>
        //                 </Link>
        //                 <p className="mt-2">♡ Wishlist</p>
        //                 <div className="flex gap-4 mt-4">
        //                     <FaFacebook className="text-xl cursor-pointer" />
        //                     <FaInstagram className="text-xl cursor-pointer" />
        //                 </div>
        //             </div>
        //         </nav>
        //     </div>
        // </header>



    );
};

export default Header;
