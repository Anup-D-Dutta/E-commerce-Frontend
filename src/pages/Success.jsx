import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation()
    
    console.log("location",)  
  return (
    <div className='m-2 w-full max-w-md p-4 py-5 rounded mx-auto flex text-center flex-col justify-center items-center gap-5'>
        <p className='text-green-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment" } Successfully</p>
        <Link to="/" className="borde text-black hover:bg-gray-400 transition-all px-4 py-1">Go To Home</Link>
    </div>
  )
}

export default Success
