import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
        <section className='w-full h-[90vh] container mx-auto px-2 flex items-center justify-center bg-gray-200'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Forgot Password </p>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email :</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-black'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
             
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-black " : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send Otp</button>

                </form>

                <p>
                    Already have account? <Link to={"/login"} className='font-semibold text-gray-700 hover:text-black'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ForgotPassword


