// import React, { useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { Link, useNavigate } from 'react-router-dom';
// import fetchUserDetails from '../utils/fetchUserDetails';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';
// import login from '../assets/login.jpg'

// const Login = () => {
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     })
//     const [showPassword, setShowPassword] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setData((preve) => {
//             return {
//                 ...preve,
//                 [name]: value
//             }
//         })
//     }

//     const valideValue = Object.values(data).every(el => el)


//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         try {
//             const response = await Axios({
//                 ...SummaryApi.login,
//                 data: data
//             })

//             if (response.data.error) {
//                 toast.error(response.data.message)
//             }

//             if (response.data.success) {
//                 toast.success(response.data.message)
//                 localStorage.setItem('accesstoken', response.data.data.accesstoken)
//                 localStorage.setItem('refreshToken', response.data.data.refreshToken)

//                 const userDetails = await fetchUserDetails()
//                 dispatch(setUserDetails(userDetails.data))

//                 setData({
//                     email: "",
//                     password: "",
//                 })
//                 navigate("/")
//             }

//         } catch (error) {
//             AxiosToastError(error)
//         }



//     }
//     return (
//         <section className='w-full h-[90vh] lg:h-[83vh] flex items-center justify-center container mx-auto px-2 bg-gray-200'>
//         <div className='flex lg:hidden'>
//             <img src={login} />
//         </div>

//                 <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 '>

//                     <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
//                         <div className='grid gap-1'>
//                             <label htmlFor='email'>Email :</label>
//                             <input
//                                 type='email'
//                                 id='email'
//                                 className='p-2 border rounded outline-none focus:border-black'
//                                 name='email'
//                                 value={data.email}
//                                 onChange={handleChange}
//                                 placeholder='Enter your email'
//                             />
//                         </div>
//                         <div className='grid gap-1'>
//                             <label htmlFor='password'>Password :</label>
//                             <div className='p-2 border rounded flex items-center focus-within:border-black'>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     id='password'
//                                     className='w-full outline-none'
//                                     name='password'
//                                     value={data.password}
//                                     onChange={handleChange}
//                                     placeholder='Enter your password'
//                                 />
//                                 <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
//                                     {
//                                         showPassword ? (
//                                             <FaRegEye />
//                                         ) : (
//                                             <FaRegEyeSlash />
//                                         )
//                                     }
//                                 </div>
//                             </div>
//                             <Link to={"/forgot-password"} className='block ml-auto hover:font-bold'>Forgot password ?</Link>
//                         </div>

//                         <button disabled={!valideValue} className={` ${valideValue ? "bg-black hover:bg-gray-900" : "bg-gray-500"}    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

//                     </form>

//                     <p style={{textAlign: 'right'}}>
//                         Don't have account? <Link to={"/register"} className='font-semibold text-black hover:text-gray-800'>Register</Link>
//                     </p>
//                 </div>
//         </section>
//     )
// }

// export default Login





import React, { useState, useEffect } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import login4 from '../assets/logo3.png';
import T from '../assets/T.png';
import login from '../assets/login.jpg';
import { motion } from 'framer-motion';
import Footer from '../components/Footer'

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const validValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({ ...SummaryApi.login, data });

            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }

            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('accesstoken', response.data.data.accesstoken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);

                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));

                setData({ email: "", password: "" });
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        // <div className={`w-full min-h-screen ${isSmallScreen ? '' : 'flex items-center justify-center'}`}>
        //     {/* Background Image for Small Screens */}
        //     {isSmallScreen && (
        //         <div
        //             className="absolute inset-0 z-0 bg-cover bg-center"
        //             style={{ backgroundImage: `url(${login})` }}
        //         ></div>
        //     )}

        //     {/* Form Container */}
        //     <motion.div
        //         initial={isSmallScreen ? { x: "100%" } : false}
        //         animate={isSmallScreen ? { x: 0 } : false}
        //         transition={isSmallScreen ? { type: "spring", stiffness: 100, damping: 15 } : {}}
        //         className={`relative z-10 w-full ${isSmallScreen ? 'p-4 pt-24' : 'max-w-lg'} `}
        //     >
        //         {/* <section className="bg-white border border-black rounded shadow-lg p-7"> */}
        //             <section className="bg-white/3 lg:bg-white backdrop-blur-md border border-black rounded shadow-lg p-7">

        //                 <form className="grid gap-4" onSubmit={handleSubmit}>
        //                     {/* Email */}
        //                     <div className="grid gap-1">
        //                         <label htmlFor="email">Email :</label>
        //                         <input
        //                             type="email"
        //                             id="email"
        //                             name="email"
        //                             className="p-2 border rounded outline-none focus:border-black bg-transparent"
        //                             value={data.email}
        //                             onChange={handleChange}
        //                             placeholder="Enter your email"
        //                         />
        //                     </div>

        //                     {/* Password */}
        //                     <div className="grid gap-1">
        //                         <label htmlFor="password">Password :</label>
        //                         <div className="p-2 border rounded flex items-center focus-within:border-black">
        //                             <input
        //                                 type={showPassword ? "text" : "password"}
        //                                 id="password"
        //                                 name="password"
        //                                 className="w-full outline-none bg-transparent"
        //                                 value={data.password}
        //                                 onChange={handleChange}
        //                                 placeholder="Enter your password"
        //                             />
        //                             <div onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer">
        //                                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        //                             </div>
        //                         </div>
        //                         <Link to={"/forgot-password"} className="block ml-auto hover:font-bold">
        //                             Forgot password?
        //                         </Link>
        //                     </div>

        //                     {/* Submit */}
        //                     <button
        //                         disabled={!validValue}
        //                         className={`w-full ${validValue ? "bg-black hover:bg-gray-900" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
        //                     >
        //                         Login
        //                     </button>
        //                 </form>

        //                 <p className="text-right">
        //                     Don't have an account?{" "}
        //                     <Link to={"/register"} className="font-semibold text-black hover:text-gray-800">
        //                         Register
        //                     </Link>
        //                 </p>
        //             </section>
        //     </motion.div>
        // </div>
        // <div className={`w-full min-h-screen flex lg:items-start items-center lg:justify-end justify-center relative`}>
        //     {/* Background Image for Small Screens */}
        //     {isSmallScreen && (
        //         <div
        //             className="absolute inset-0 z-0 bg-cover bg-center"
        //             style={{ backgroundImage: `url(${login4})` }}
        //         ></div>
        //     )}

        //     <div className=' hidden lg:block'>
        //         <img src={login}/>
        //     </div>

        //     {/* Form Container */}
        //     <motion.div
        //         initial={isSmallScreen ? { x: "100%" } : false}
        //         animate={isSmallScreen ? { x: 0 } : false}
        //         transition={isSmallScreen ? { type: "spring", stiffness: 100, damping: 15 } : {}}
        //         className={`relative z-10 w-full ${isSmallScreen ? 'p-4 pt-24' : 'max-w-lg'}`}
        //     >
        //         {/* Form Section with Blurred Background */}
        //         <section className="bg-white/1 lg:bg-white h-full backdrop-blur-[0.3rem] lg:mt-24 border-black rounded shadow-lg p-7">
        //             <h1 className='text-center font-bold text-2xl'>Login</h1>

        //             <form className="grid gap-4" onSubmit={handleSubmit}>
        //                 {/* Email */}
        //                 <div className="grid gap-1">
        //                     {/* <label htmlFor="email">Email :</label> */}
        //                     <input
        //                         type="email"
        //                         id="email"
        //                         name="email"
        //                         className="p-2 border-b outline-none placeholder-gray-900 border-black bg-transparent"
        //                         value={data.email}
        //                         onChange={handleChange}
        //                         placeholder="Email"
        //                     />
        //                 </div>

        //                 {/* Password */}
        //                 <div className="grid gap-1">
        //                     {/* <label htmlFor="password">Password :</label> */}
        //                     <div className="p-2 border-b flex items-center  border-black ">
        //                         <input
        //                             type={showPassword ? "text" : "password"}
        //                             id="password"
        //                             name="password"
        //                             className="w-full outline-none placeholder-gray-900 bg-transparent"
        //                             value={data.password}
        //                             onChange={handleChange}
        //                             placeholder="Password"
        //                         />
        //                         <div onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer">
        //                             {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        //                         </div>
        //                     </div>
        //                     <Link to={"/forgot-password"} className="block ml-auto hover:font-bold">
        //                         Forgot password?
        //                     </Link>
        //                 </div>

        //                 {/* Submit */}
        //                 <button
        //                     disabled={!validValue}
        //                     className={`w-full ${validValue ? "bg-black hover:bg-gray-900" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
        //                 >
        //                     Login
        //                 </button>
        //             </form>

        //             <p className="text-right">
        //                 Don't have an account?{" "}
        //                 <Link to={"/register"} className="font-semibold text-black hover:text-gray-800">
        //                     Register
        //                 </Link>
        //             </p>
        //         </section>
        //     </motion.div>
        // </div>

        // <div className="min-h-sc p-2 w-full flex flex-col items-center justify-center lg:flex-row">
        //     {/* {isSmallScreen && (
        //         <div
        //             className="absolute inset-0 z-0 bg-cover bg-center"
        //             style={{ backgroundImage: `url(${login4})` }}
        //         ></div>
        //     )} */}
        //     <div className=' w-full flex border h-[40rem] border-black'>
        //         {/* Left Image Section */}
        //         <div className="lg:w-[30rem] w-full hidden lg:flex bg-gray-100">
        //             <img src={login} alt="Login Banner" className="object-cover w-full h-full" />
        //         </div>

        //         {/* Right Form Section */}
        //         <div className="flex flex-col border border-black items-center justify-center lg:w-1/3 w-full p-">


        //             {/* <section className="bg-white/1 w-[30rem] justify-center items-center lg:bg-white h-full backdrop-blur-[0.3rem] border border-black rounded  p-7"> */}
        //             <section className="bg-white/8 h-full w-full  max-w-md border justify-center items-center lg:bg-white min-h-[25rem] backdrop-blur-md border-black rounded p-7">
        //                 {/* <img src={login4} alt="" className='w-[10rem] mx-auto hidden lg:flex' /> */}
        //                 <img src={T} alt="" className='w-[10rem] mx-auto' />
        //                 <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>
        //                 <p className="mb-6 text-gray-600 text-sm text-center">Join us now to be a part of Trendora family</p>

        //                 <form className="grid gap-4 " onSubmit={handleSubmit}>
        //                     <div className="grid gap-1">
        //                         <input
        //                             type="email"
        //                             id="email"
        //                             name="email"
        //                             className="p-2 border-b outline-none placeholder-gray-500 border-black bg-transparent"
        //                             value={data.email}
        //                             onChange={handleChange}
        //                             placeholder="Email"
        //                         />
        //                     </div>

        //                     <div className="grid gap-1">
        //                         <div className="p-2 border-b flex items-center  border-black ">
        //                             <input
        //                                 type={showPassword ? "text" : "password"}
        //                                 id="password"
        //                                 name="password"
        //                                 className="w-full outline-none placeholder-gray-500 bg-transparent"
        //                                 value={data.password}
        //                                 onChange={handleChange}
        //                                 placeholder="Password"
        //                             />
        //                             <div onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer">
        //                                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        //                             </div>
        //                         </div>
        //                         <Link to={"/forgot-password"} className="block ml-auto hover:font-bold">
        //                             Forgot password?
        //                         </Link>
        //                     </div>

        //                     <button
        //                         disabled={!validValue}
        //                         className={`w-full ${validValue ? "bg-black hover:bg-gray-900" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
        //                     >
        //                         Login
        //                     </button>
        //                 </form>

        //                 <p className="text-right">
        //                     Don't have an account?{" "}
        //                     <Link to={"/register"} className="font-semibold text-black hover:text-gray-800">
        //                         Register
        //                     </Link>
        //                 </p>
        //                 <div className="flex gap-4 mt-8  lg-flex">
        //                     <button className="w-full border border-black py-2 rounded flex items-center justify-center gap-2 hover:shadow-md">
        //                         <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
        //                         Google
        //                     </button>
        //                     <button className="w-full border border-black py-2 rounded flex items-center justify-center gap-2 hover:shadow-md">
        //                         <img src="https://img.icons8.com/color/16/000000/facebook.png" alt="Facebook" />
        //                         Facebook
        //                     </button>
        //                 </div>
        //                 <p className="text-xs text-gray-500 mt-6 text-center">
        //                     By creating an account or logging in, you agree with Trendora's{' '}
        //                     <a href="#" className="underline">T&C</a> and <a href="#" className="underline">Privacy Policy</a>
        //                 </p>
        //             </section>

        //         </div>

        //     </div>
        // </div>
        <div className="lg:p-5 flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl h-[36rem] lg:shadow rounded overflow-hidden">
                {/* Left Pane (Branding) */}
                <div className="hidden lg:flex flex-col justify-center bg-gray-700 text-white w-1/2 p-10">
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <p className="text-lg leading-6">Get access to your Orders, Wishlist and Recommendations</p>
                    {/* <img src={T} alt="Brand Banner" className="mt-14 object-contain w-32" /> */}
                </div>


                {/* Right Pane (Login Form) */}
                <div className="bg-white w-full lg:w-1/2 p-8 flex flex-col justify-center">

                    <div className=" lg:hidden flex-col mb-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                        <p className="text-sm leading-6 text-center">Get access to your Orders, Wishlist and Recommendations</p>
                        {/* <img src={T} alt="Brand Banner" className="mt-14 object-contain w-32" /> */}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border-b-2 border-gray-400 focus:border-gray-700 outline-none py-2 text-sm"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full border-b-2 border-gray-400 focus:border-gray-700 outline-none py-2 text-sm"
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className="absolute right-2 top-2.5 cursor-pointer">
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                        <Link to={"/forgot-password"}>
                            <p className="text-xs text-gray-700 text-right cursor-pointer mt-2 hover:underline">
                                Forgot Password?
                            </p></Link>

                        <button
                            disabled={!validValue}
                            className={`w-full py-2 text-white rounded font-semibold tracking-wide ${validValue ? "bg-gray-700 " : "bg-gray-500 cursor-not-allowed"}`}
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-sm text-center mt-4">
                        <span className="text-gray-600">New to Trendora?</span>
                        <Link to="/register" className="text-gray-700 font-semibold ml-1 hover:underline">
                            Create an account
                        </Link>
                    </div>

                    <p className="text-xs text-gray-400 mt-6 text-center">
                        By continuing, you agree to Trendora's <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>




    );
};

export default Login;
