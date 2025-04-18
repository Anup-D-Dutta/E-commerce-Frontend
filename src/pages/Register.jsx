import React, { useState, useCallback, useMemo } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

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
    <section className='w-full h-[90vh] lg:h-[85vh] flex items-center justify-center container mx-auto px-2 bg-gray-200'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <h1 className='text-center'>Welcome to Web-Name</h1>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              autoFocus
              className=' p-2 border rounded outline-none focus:border-black'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              className=' p-2 border rounded outline-none focus:border-black'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='password'>Password :</label>
            <div className=' p-2 border rounded flex items-center focus-within:border-black'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'>Confirm Password :</label>
            <div className=' p-2 border rounded flex items-center focus-within:border-black'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter your confirm password'
              />
              <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${
              valideValue ? 'bg-black' : 'bg-gray-500'
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>

        <p className='text-right'>
          Already have an account?{' '}
          <Link to='/login' className='font-semibold text-black' >
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
