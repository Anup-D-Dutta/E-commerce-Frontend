import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'
import T from '../assets/T.png'
// import register2 from '../assets/register2.jpg'


const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const valideValue = useMemo(() => Object.values(data).every((el) => el), [data])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      if (data.password !== data.confirmPassword) {
        toast.error('Password and confirm password must be same')
        return
      }

      try {
        const response = await Axios({
          ...SummaryApi.register,
          data,
        })

        if (response.data.error) {
          toast.error(response.data.message)
        }

        if (response.data.success) {
          toast.success(response.data.message)
          setData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          })
          navigate('/login')
        }
      } catch (error) {
        AxiosToastError(error)
      }
    },
    [data, navigate]
  )

  return (
    // <section className='w-full h-[90vh] lg:h-[85vh] flex items-center justify-center container mx-auto px-2'>
    //   <div className=' my-4 w-full max-w-lg mx-auto rounded p-7 items-center justify-center text-center'>
    //   <img src={register} className='w-32 h-32 rounded-full border border-black' />

    //     <h1 className='text-center font-bold text-xl'>Welcome to Web-Name</h1>

    //     <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
    //       <div className='grid gap-1'>
    //         {/* <label htmlFor='name'>Name :</label> */}
    //         <input
    //           type='text'
    //           id='name'
    //           autoFocus
    //           className=' p-2 border-b outline-none border-black'
    //           name='name'
    //           value={data.name}
    //           onChange={handleChange}
    //           placeholder='Enter your name'
    //         />
    //       </div>

    //       <div className='grid gap-1'>
    //         {/* <label htmlFor='email'>Email :</label> */}
    //         <input
    //           type='email'
    //           id='email'
    //           className=' p-2 border-b outline-none border-black'
    //           name='email'
    //           value={data.email}
    //           onChange={handleChange}
    //           placeholder='Enter your email'
    //         />
    //       </div>

    //       <div className='grid gap-1'>
    //         {/* <label htmlFor='password'>Password :</label> */}
    //         <div className=' p-2 border-b flex items-center border-black'>
    //           <input
    //             type={showPassword ? 'text' : 'password'}
    //             id='password'
    //             className='w-full outline-none'
    //             name='password'
    //             value={data.password}
    //             onChange={handleChange}
    //             placeholder='Enter your password'
    //           />
    //           <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
    //             {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
    //           </div>
    //         </div>
    //       </div>

    //       <div className='grid gap-1'>
    //         {/* <label htmlFor='confirmPassword'>Confirm Password :</label> */}
    //         <div className=' p-2 border-b  flex items-center border-black'>
    //           <input
    //             type={showConfirmPassword ? 'text' : 'password'}
    //             id='confirmPassword'
    //             className='w-full outline-none'
    //             name='confirmPassword'
    //             value={data.confirmPassword}
    //             onChange={handleChange}
    //             placeholder='Enter your confirm password'
    //           />
    //           <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
    //             {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
    //           </div>
    //         </div>
    //       </div>

    //       <button
    //         disabled={!valideValue}
    //         className={`${
    //           valideValue ? 'bg-black' : 'bg-gray-500'
    //         } text-white py-2 rounded font-semibold my-3 tracking-wide`}
    //       >
    //         Register
    //       </button>
    //     </form>

    //     <p className='text-right'>
    //       Already have an account?{' '}
    //       <Link to='/login' className='font-semibold text-black' >
    //         Login
    //       </Link>
    //     </p>
    //   </div>
    // </section>

    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* Background for small screens */}
      {/* {isSmallScreen && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center backdrop-blur-md"
          style={{ backgroundImage: `url(${register2})` }}
        ></div>
      )} */}

      {/* Main Section */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center container mx-auto px-2 ">
        <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white/20 lg:bg-white lg:shadow backdrop-blur-[0.2rem]  border-black rounded p-7">

          {/* Image */}
          {/* <img src={register} alt="Profile" className="w-32 h-32 rounded-full border border-black mb-2" /> */}

          {/* Welcome Text */}
          <h1 className="text-center font-bold text-3xl my-2">Sign up</h1>
          {/* <img src={T} alt="" className='w-40'/> */}

          <p className="mb-6 text-gray-600 text-sm text-center">Join us now to be a part of Trendora family</p>


          {/* Form */}
          <form className="grid gap-4 w-full mt-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="grid gap-1">
              <input
                type="text"
                id="name"
                autoFocus
                className="p-2 border-b outline-none border-gray-400 focus:border-gray-700 bg-transparent"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="grid gap-1">
              <input
                type="email"
                id="email"
                className="p-2 border-b outline-none border-gray-400 focus:border-gray-700 bg-transparent"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="grid gap-1">
              <div className="p-2 border-b flex items-center border-gray-400">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full outline-none focus:border-gray-700 bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <div onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer">
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-1">
              <div className="p-2 border-b flex items-center border-gray-400">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full outline-none focus:border-gray-700 bg-transparent"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                />
                <div onClick={() => setShowConfirmPassword((prev) => !prev)} className="cursor-pointer">
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={!valideValue}
              className={`${valideValue ? "bg-gray-700" : "bg-gray-500 cursor-not-allowed"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-right w-full">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-black">
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>


  )
}

export default Register
