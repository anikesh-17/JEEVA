// src/pages/Login.jsx
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin, handleSubmit } from '../Utils/Config';

import { useNavigate } from 'react-router-dom';
import Logo from "../assets/Images/final_logo.png"; // Import the logo

const Login = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setFormVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#e5fdf2] px-4'>
      <div className={`relative bg-white text-gray-800 shadow-xl rounded-xl p-10 max-w-md w-full
        hover:shadow-2xl transition duration-300
        ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transform transition-all duration-500
         ease-out`}>

        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-20 w-auto object-contain" />
        </div>

        <h2 className='text-3xl font-bold text-center mb-4 text-[#00ADB5]'>Welcome Back</h2>
        <p className='text-gray-500 text-center mb-6'>Login to your Account</p>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={(e) => handleSubmit(e, setError, navigate)} className=' space-y-6'>
          <div>
            <label htmlFor="email" className=' block text-gray-600 font-medium mb-1'>Email Address</label>
            <input required type="email" name='email' id='email' placeholder='Enter Your Email' className='w-full border-b
             border-gray-300 bg-transparent text-gray-800 px-2 py-1 focus:border-[#00ADB5] focus:outline-none placeholder-gray-400' />
          </div>

          <div className=' relative'>
            <label htmlFor="password" className='block text-gray-600 font-medium mb-1' >Password</label>
            <input type={passwordVisible ? 'text' : 'password'} id='password' name='password' placeholder='Enter your Password' className='w-full border-b
             border-gray-300 bg-transparent text-gray-800 px-2 py-1 focus:border-[#00ADB5] focus:outline-none placeholder-gray-400'/>
            <button type='button' onClick={() => setPasswordVisible(!passwordVisible)} className=' absolute right-2 top-8 text-gray-400 hover:text-[#00ADB5] focus:outline-none'>
              {passwordVisible ? (
                <AiOutlineEyeInvisible className='h-5 w-5' />
              ) : (<AiOutlineEye className='w-5 h-5' />)}
            </button>
          </div>
          <button type='submit' className=' w-full bg-[#00ADB5] text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300 focus:ring focus:ring-cyan-300
            focus:outline-none shadow-md hover:shadow-lg font-semibold'>
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className=' mt-8 flex items-center justify-between'>
          <span className=' border-b w-1/4 border-gray-300'></span>
          <span className=' text-gray-400 text-sm'>OR</span>
          <span className=' border-b w-1/4 border-gray-300'></span>
        </div>

        {/* GOOGLE BUTTON */}
        <button onClick={() => handleGoogleLogin(setError, navigate)} className=' mt-6 w-full flex items-center justify-center bg-white border border-gray-300 py-2
         rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300 focus:ring focus:ring-cyan-300
          focus:outline-none text-gray-700 font-medium'>
          <FcGoogle className='h-6 w-6 mr-3' />
          Continue with Google
        </button>

        <p className='text-center text-gray-500 text-sm mt-6'>
          Don't have an account? <a href="/signup" className='text-[#00ADB5] hover:underline'>Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login;
